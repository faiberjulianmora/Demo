<?php
class PDF extends FPDF
{
    var $angle=0;
    function Rotate($angle,$x=-1,$y=-1)
    {
        if($x==-1)
            $x=$this->x;
        if($y==-1)
            $y=$this->y;
        if($this->angle!=0)
            $this->_out('Q');
        $this->angle=$angle;
        if($angle!=0)
        {
            $angle*=M_PI/180;
            $c=cos($angle);
            $s=sin($angle);
            $cx=$x*$this->k;
            $cy=($this->h-$y)*$this->k;            
            $this->_out(sprintf('q %.5F %.5F %.5F %.5F %.2F %.2F cm 1 0 0 1 %.2F %.2F cm',$c,$s,-$s,$c,$cx,$cy,-$cx,-$cy));
        }
    }

    function _endpage()
    {
        if($this->angle!=0)
        {
            $this->angle=0;
            $this->_out('Q');
        }
        parent::_endpage();
    }
    
    function RotatedText($w,$h,$txt,$angle,$border,$bajar=0)
    {        
        $out = "";
        $dx = 0;
        $x = ($this->x+$dx);
        $y = $this->y+.5*20+.3*$this->FontSize;
        if($this->ColorFlag){
            $this->_out('q '.$this->TextColor.' ');
        }
        $this->Rotate($angle,$x,$y);
        $txt2 = str_replace(')','\\)',str_replace('(','\\(',str_replace('\\','\\\\',$txt)));
        $out .= sprintf('BT %.2F %.2F Td (%s) Tj ET',($x- 13)*$this->k,($this->h-$y)*$this->k - 10,$txt2);
        $this->_out($out);
        //vuelvo a rota el angulo para que quede normal osea en angulo 0
        $this->Rotate(0);
        //Ahora dibujo los bordes si asi se especifico
        if($border == 1){
            $op = 'S';
            $out = sprintf('%.2F %.2F %.2F %.2F re %s ',$this->x*$this->k,($this->h-$this->y)*$this->k,$w*$this->k,-$h*$this->k,$op);
            $this->_out($out);
        }
        $this->x += $w;
    }

    function RotatedImage($file,$x,$y,$w,$h,$angle)
    {
        $this->Rotate($angle,$x,$y);
        $this->Image($file,$x,$y,$w,$h);
        $this->Rotate(0);
    }

    //***********************************************************//
    //                      Cajas de Texto                       //
    //                         TextBox                           //
    //Cajas de texto con ubicacion XY y medidas XY(width, height)//
    //***********************************************************//

    function drawTextBox($strText, $w, $h, $align='L', $valign='T', $border=true)
    {
        $xi=$this->GetX();
        $yi=$this->GetY();
        
        $hrow=$this->FontSize;
        $textrows=$this->drawRows($w,$hrow,$strText,0,$align,0,0,0);
        $maxrows=floor($h/$this->FontSize);
        $rows=min($textrows,$maxrows);

        $dy=0;
        if (strtoupper($valign)=='M')
            $dy=($h-$rows*$this->FontSize)/2;
        if (strtoupper($valign)=='B')
            $dy=$h-$rows*$this->FontSize;

        $this->SetY($yi+$dy);
        $this->SetX($xi);

        $this->drawRows($w,$hrow,$strText,0,$align,false,$rows,1);

        if ($border)
            $this->Rect($xi,$yi,$w,$h);
    }

    function drawRows($w, $h, $txt, $border=0, $align='J', $fill=false, $maxline=0, $prn=0)
    {
        $cw=&$this->CurrentFont['cw'];
        if($w==0)
            $w=$this->w-$this->rMargin-$this->x;
        $wmax=($w-2*$this->cMargin)*1000/$this->FontSize;
        $s=str_replace("\r",'',$txt);
        $nb=strlen($s);
        if($nb>0 && $s[$nb-1]=="\n")
            $nb--;
        $b=0;
        if($border)
        {
            if($border==1)
            {
                $border='LTRB';
                $b='LRT';
                $b2='LR';
            }
            else
            {
                $b2='';
                if(is_int(strpos($border,'L')))
                    $b2.='L';
                if(is_int(strpos($border,'R')))
                    $b2.='R';
                $b=is_int(strpos($border,'T')) ? $b2.'T' : $b2;
            }
        }
        $sep=-1;
        $i=0;
        $j=0;
        $l=0;
        $ns=0;
        $nl=1;
        while($i<$nb)
        {
            //Get next character
            $c=$s[$i];
            if($c=="\n")
            {
                //Explicit line break
                if($this->ws>0)
                {
                    $this->ws=0;
                    if ($prn==1) $this->_out('0 Tw');
                }
                if ($prn==1) {
                    $this->Cell($w,$h,substr($s,$j,$i-$j),$b,2,$align,$fill);
                }
                $i++;
                $sep=-1;
                $j=$i;
                $l=0;
                $ns=0;
                $nl++;
                if($border && $nl==2)
                    $b=$b2;
                if ( $maxline && $nl > $maxline )
                    return substr($s,$i);
                continue;
            }
            if($c==' ')
            {
                $sep=$i;
                $ls=$l;
                $ns++;
            }
            $l+=$cw[$c];
            if($l>$wmax)
            {
                //Automatic line break
                if($sep==-1)
                {
                    if($i==$j)
                        $i++;
                    if($this->ws>0)
                    {
                        $this->ws=0;
                        if ($prn==1) $this->_out('0 Tw');
                    }
                    if ($prn==1) {
                        $this->Cell($w,$h,substr($s,$j,$i-$j),$b,2,$align,$fill);
                    }
                }
                else
                {
                    if($align=='J')
                    {
                        $this->ws=($ns>1) ? ($wmax-$ls)/1000*$this->FontSize/($ns-1) : 0;
                        if ($prn==1) $this->_out(sprintf('%.3F Tw',$this->ws*$this->k));
                    }
                    if ($prn==1){
                        $this->Cell($w,$h,substr($s,$j,$sep-$j),$b,2,$align,$fill);
                    }
                    $i=$sep+1;
                }
                $sep=-1;
                $j=$i;
                $l=0;
                $ns=0;
                $nl++;
                if($border && $nl==2)
                    $b=$b2;
                if ( $maxline && $nl > $maxline )
                    return substr($s,$i);
            }
            else
                $i++;
        }
        //Last chunk
        if($this->ws>0)
        {
            $this->ws=0;
            if ($prn==1) $this->_out('0 Tw');
        }
        if($border && is_int(strpos($border,'B')))
            $b.='B';
        if ($prn==1) {
            $this->Cell($w,$h,substr($s,$j,$i-$j),$b,2,$align,$fill);
        }
        $this->x=$this->lMargin;
        return $nl;
    }

    /*
    -------------- Ejemplo --------------
    $pdf=new PDF_TextBox();
    $pdf->AddPage();
    $pdf->SetFont('Arial','',15);
    $pdf->SetXY(80,35);
    $pdf->drawTextBox('This sentence is centered in the middle of the box.', 50, 50, 'C', 'M');
    $pdf->Output();
    -------------------------------------
    */

    //***********************************************************//
    //                      Cajas de Texto                       //
    //                  Extended Cell functions                  //
    //***********************************************************//
    function VCell($w, $h=0, $txt='', $border=0, $ln=0, $align='', $fill=false)
    {
        //Output a cell
        $k=$this->k;
        if($this->y+$h>$this->PageBreakTrigger && !$this->InHeader && !$this->InFooter && $this->AcceptPageBreak())
        {
            //Automatic page break
            $x=$this->x;
            $ws=$this->ws;
            if($ws>0)
            {
                $this->ws=0;
                $this->_out('0 Tw');
            }
            $this->AddPage($this->CurOrientation,$this->CurPageSize);
            $this->x=$x;
            if($ws>0)
            {
                $this->ws=$ws;
                $this->_out(sprintf('%.3F Tw',$ws*$k));
            }
        }
        if($w==0)
            $w=$this->w-$this->rMargin-$this->x;
        $s='';
    // begin change Cell function 
        if($fill || $border>0)
        {
            if($fill)
                $op=($border>0) ? 'B' : 'f';
            else
                $op='S';
            if ($border>1) {
                $s=sprintf('q %.2F w %.2F %.2F %.2F %.2F re %s Q ',$border,
                            $this->x*$k,($this->h-$this->y)*$k,$w*$k,-$h*$k,$op);
            }
            else
                $s=sprintf('%.2F %.2F %.2F %.2F re %s ',$this->x*$k,($this->h-$this->y)*$k,$w*$k,-$h*$k,$op);
        }
        if(is_string($border))
        {
            $x=$this->x;
            $y=$this->y;
            if(is_int(strpos($border,'L')))
                $s.=sprintf('%.2F %.2F m %.2F %.2F l S ',$x*$k,($this->h-$y)*$k,$x*$k,($this->h-($y+$h))*$k);
            else if(is_int(strpos($border,'l')))
                $s.=sprintf('q 2 w %.2F %.2F m %.2F %.2F l S Q ',$x*$k,($this->h-$y)*$k,$x*$k,($this->h-($y+$h))*$k);
                
            if(is_int(strpos($border,'T')))
                $s.=sprintf('%.2F %.2F m %.2F %.2F l S ',$x*$k,($this->h-$y)*$k,($x+$w)*$k,($this->h-$y)*$k);
            else if(is_int(strpos($border,'t')))
                $s.=sprintf('q 2 w %.2F %.2F m %.2F %.2F l S Q ',$x*$k,($this->h-$y)*$k,($x+$w)*$k,($this->h-$y)*$k);
            
            if(is_int(strpos($border,'R')))
                $s.=sprintf('%.2F %.2F m %.2F %.2F l S ',($x+$w)*$k,($this->h-$y)*$k,($x+$w)*$k,($this->h-($y+$h))*$k);
            else if(is_int(strpos($border,'r')))
                $s.=sprintf('q 2 w %.2F %.2F m %.2F %.2F l S Q ',($x+$w)*$k,($this->h-$y)*$k,($x+$w)*$k,($this->h-($y+$h))*$k);
            
            if(is_int(strpos($border,'B')))
                $s.=sprintf('%.2F %.2F m %.2F %.2F l S ',$x*$k,($this->h-($y+$h))*$k,($x+$w)*$k,($this->h-($y+$h))*$k);
            else if(is_int(strpos($border,'b')))
                $s.=sprintf('q 2 w %.2F %.2F m %.2F %.2F l S Q ',$x*$k,($this->h-($y+$h))*$k,($x+$w)*$k,($this->h-($y+$h))*$k);
        }
        if(trim($txt)!='')
        {
            $cr=substr_count($txt,"\n");
            if ($cr>0) { // Multi line
                $txts = explode("\n", $txt);
                $lines = count($txts);
                for($l=0;$l<$lines;$l++) {
                    $txt=$txts[$l];
                    $w_txt=$this->GetStringWidth($txt);
                    if ($align=='U')
                        $dy=$this->cMargin+$w_txt;
                    elseif($align=='D')
                        $dy=$h-$this->cMargin;
                    else
                        $dy=($h+$w_txt)/2;
                    $txt=str_replace(')','\\)',str_replace('(','\\(',str_replace('\\','\\\\',$txt)));
                    if($this->ColorFlag)
                        $s.='q '.$this->TextColor.' ';
                    $s.=sprintf('BT 0 1 -1 0 %.2F %.2F Tm (%s) Tj ET ',
                        ($this->x+.5*$w+(.7+$l-$lines/2)*$this->FontSize)*$k,
                        ($this->h-($this->y+$dy))*$k,$txt);
                    if($this->ColorFlag)
                        $s.=' Q ';
                }
            }
            else { // Single line
                $w_txt=$this->GetStringWidth($txt);
                $Tz=100;
                if ($w_txt>$h-2*$this->cMargin) {
                    $Tz=($h-2*$this->cMargin)/$w_txt*100;
                    $w_txt=$h-2*$this->cMargin;
                }
                if ($align=='U')
                    $dy=$this->cMargin+$w_txt;
                elseif($align=='D')
                    $dy=$h-$this->cMargin;
                else
                    $dy=($h+$w_txt)/2;
                $txt=str_replace(')','\\)',str_replace('(','\\(',str_replace('\\','\\\\',$txt)));
                if($this->ColorFlag)
                    $s.='q '.$this->TextColor.' ';
                $s.=sprintf('q BT 0 1 -1 0 %.2F %.2F Tm %.2F Tz (%s) Tj ET Q ',
                            ($this->x+.5*$w+.3*$this->FontSize)*$k,
                            ($this->h-($this->y+$dy))*$k,$Tz,$txt);
                if($this->ColorFlag)
                    $s.=' Q ';
            }
        }
    // end change Cell function 
        if($s)
            $this->_out($s);
        $this->lasth=$h;
        if($ln>0)
        {
            //Go to next line
            $this->y+=$h;
            if($ln==1)
                $this->x=$this->lMargin;
        }
        else
            $this->x+=$w;
    }

    function Cell($w, $h=0, $txt='', $border=0, $ln=0, $align='', $fill=false, $link='')
    {
        //Output a cell
        $k=$this->k;
        if($this->y+$h>$this->PageBreakTrigger && !$this->InHeader && !$this->InFooter && $this->AcceptPageBreak())
        {
            //Automatic page break
            $x=$this->x;
            $ws=$this->ws;
            if($ws>0)
            {
                $this->ws=0;
                $this->_out('0 Tw');
            }
            $this->AddPage($this->CurOrientation,$this->CurPageSize);
            $this->x=$x;
            if($ws>0)
            {
                $this->ws=$ws;
                $this->_out(sprintf('%.3F Tw',$ws*$k));
            }
        }
        if($w==0)
            $w=$this->w-$this->rMargin-$this->x;
        $s='';
    // begin change Cell function
        if($fill || $border>0)
        {
            if($fill)
                $op=($border>0) ? 'B' : 'f';
            else
                $op='S';
            if ($border>1) {
                $s=sprintf('q %.2F w %.2F %.2F %.2F %.2F re %s Q ',$border,
                    $this->x*$k,($this->h-$this->y)*$k,$w*$k,-$h*$k,$op);
            }
            else
                $s=sprintf('%.2F %.2F %.2F %.2F re %s ',$this->x*$k,($this->h-$this->y)*$k,$w*$k,-$h*$k,$op);
        }
        if(is_string($border))
        {
            $x=$this->x;
            $y=$this->y;
            if(is_int(strpos($border,'L')))
                $s.=sprintf('%.2F %.2F m %.2F %.2F l S ',$x*$k,($this->h-$y)*$k,$x*$k,($this->h-($y+$h))*$k);
            else if(is_int(strpos($border,'l')))
                $s.=sprintf('q 2 w %.2F %.2F m %.2F %.2F l S Q ',$x*$k,($this->h-$y)*$k,$x*$k,($this->h-($y+$h))*$k);
                
            if(is_int(strpos($border,'T')))
                $s.=sprintf('%.2F %.2F m %.2F %.2F l S ',$x*$k,($this->h-$y)*$k,($x+$w)*$k,($this->h-$y)*$k);
            else if(is_int(strpos($border,'t')))
                $s.=sprintf('q 2 w %.2F %.2F m %.2F %.2F l S Q ',$x*$k,($this->h-$y)*$k,($x+$w)*$k,($this->h-$y)*$k);
            
            if(is_int(strpos($border,'R')))
                $s.=sprintf('%.2F %.2F m %.2F %.2F l S ',($x+$w)*$k,($this->h-$y)*$k,($x+$w)*$k,($this->h-($y+$h))*$k);
            else if(is_int(strpos($border,'r')))
                $s.=sprintf('q 2 w %.2F %.2F m %.2F %.2F l S Q ',($x+$w)*$k,($this->h-$y)*$k,($x+$w)*$k,($this->h-($y+$h))*$k);
            
            if(is_int(strpos($border,'B')))
                $s.=sprintf('%.2F %.2F m %.2F %.2F l S ',$x*$k,($this->h-($y+$h))*$k,($x+$w)*$k,($this->h-($y+$h))*$k);
            else if(is_int(strpos($border,'b')))
                $s.=sprintf('q 2 w %.2F %.2F m %.2F %.2F l S Q ',$x*$k,($this->h-($y+$h))*$k,($x+$w)*$k,($this->h-($y+$h))*$k);
        }
        if (trim($txt)!='') {
            $cr=substr_count($txt,"\n");
            if ($cr>0) { // Multi line
                $txts = explode("\n", $txt);
                $lines = count($txts);
                for($l=0;$l<$lines;$l++) {
                    $txt=$txts[$l];
                    $w_txt=$this->GetStringWidth($txt);
                    if($align=='R')
                        $dx=$w-$w_txt-$this->cMargin;
                    elseif($align=='C')
                        $dx=($w-$w_txt)/2;
                    else
                        $dx=$this->cMargin;

                    $txt=str_replace(')','\\)',str_replace('(','\\(',str_replace('\\','\\\\',$txt)));
                    if($this->ColorFlag)
                        $s.='q '.$this->TextColor.' ';
                    $s.=sprintf('BT %.2F %.2F Td (%s) Tj ET ',
                        ($this->x+$dx)*$k,
                        ($this->h-($this->y+.5*$h+(.7+$l-$lines/2)*$this->FontSize))*$k,
                        $txt);
                    if($this->underline)
                        $s.=' '.$this->_dounderline($this->x+$dx,$this->y+.5*$h+.3*$this->FontSize,$txt);
                    if($this->ColorFlag)
                        $s.=' Q ';
                    if($link)
                        $this->Link($this->x+$dx,$this->y+.5*$h-.5*$this->FontSize,$w_txt,$this->FontSize,$link);
                }
            }
            else { // Single line
                $w_txt=$this->GetStringWidth($txt);
                $Tz=100;
                if ($w_txt>$w-2*$this->cMargin) { // Need compression
                    $Tz=($w-2*$this->cMargin)/$w_txt*100;
                    $w_txt=$w-2*$this->cMargin;
                }
                if($align=='R')
                    $dx=$w-$w_txt-$this->cMargin;
                elseif($align=='C')
                    $dx=($w-$w_txt)/2;
                else
                    $dx=$this->cMargin;
                $txt=str_replace(')','\\)',str_replace('(','\\(',str_replace('\\','\\\\',$txt)));
                if($this->ColorFlag)
                    $s.='q '.$this->TextColor.' ';
                $s.=sprintf('q BT %.2F %.2F Td %.2F Tz (%s) Tj ET Q ',
                            ($this->x+$dx)*$k,
                            ($this->h-($this->y+.5*$h+.3*$this->FontSize))*$k,
                            $Tz,$txt);
                if($this->underline)
                    $s.=' '.$this->_dounderline($this->x+$dx,$this->y+.5*$h+.3*$this->FontSize,$txt);
                if($this->ColorFlag)
                    $s.=' Q ';
                if($link)
                    $this->Link($this->x+$dx,$this->y+.5*$h-.5*$this->FontSize,$w_txt,$this->FontSize,$link);
            }
        }
    // end change Cell function
        if($s)
            $this->_out($s);
        $this->lasth=$h;
        if($ln>0)
        {
            //Go to next line
            $this->y+=$h;
            if($ln==1)
                $this->x=$this->lMargin;
        }
        else
            $this->x+=$w;
    }
}
?>