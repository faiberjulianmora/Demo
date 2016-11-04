<?php
header("Content-Type: text/html; charset=iso-8859-1 ");
require('../fpdf/fpdf.php');
require('../Utils/PDF.php');
require('../Utils/Utils.php');
require('../../Servicios/Utils/Conexion.php');
/****** Instancias ******/
$con = Conexion::crearConexion();
$utils = new Utils();

/****** Variables ******/
$idCliente = $_GET["idCliente"];

/****** Tipo de Idioma para la Fecha ******/
$con->prepararConsulta("SET lc_time_names = 'es_ES'");
$con->ejecutarConsulta();

/****** Finca ******/
$con->prepararConsulta("SELECT
    co.id,
    co.idCliente,
    t.nombreCompleto,
    co.totalCompra,
    co.totalContado,
    co.totalCredito,
    co.fechaCompra
    FROM compra as co 
    inner join clientes as c on co.idCliente = c.id
    inner join tercero as t on c.idTercero = t.id
    WHERE co.idCliente = ?");
$con->parametro("1", $idCliente);
$con->ejecutarConsulta();
$cabeceraReporte = $con->obtenerLista();

$pdf = new PDF('P','mm','A4');
$pdf->SetTopMargin(4);
$pdf->AliasNbPages();

$pdf->AddPage();
$pdf->SetAutoPageBreak(true, 4);
$pdf->Ln(3);
//---------- Titulo ----------//
$pdf->SetFont('Arial','I',8);
$pdf->Cell(0,0,$utils->fechaCSM(date_format(new DateTime(), 'Y-m-d'), 2),0,0,'R');
$pdf->Ln(12);
$pdf->SetFont('Arial','B',15);
$pdf->Cell(0,0,utf8_decode('Reporte de Consumo por Cliente'),0,0,'C');
$pdf->Ln(5);
$pdf->SetFont('Arial','',10);
$pdf->Ln(1);
//---------- Cabecera ----------//
$pdf->SetFont('Arial','',9);
$pdf->Cell(0,6,utf8_decode('Cliente: '.$cabeceraReporte[0]->nombreCompleto),'1',0,'C');

//----------- Tabla de Actividades del Cultivo -----------//

$pdf->Ln(7);
$pdf->SetFont('Arial','',9);
$pdf->Cell(50,6,utf8_decode('Fecha'),'LTB',0,'C');
$pdf->Cell(50,6,utf8_decode('Pago de Contado'),'LTB',0,'C');
$pdf->Cell(50,6,utf8_decode('Pago a Credito'),'LTB',0,'C');
$pdf->Cell(40,6,utf8_decode('Total Compra'),'1',0,'C');
$pdf->Ln(6);
$pdf->SetFillColor(230,230,230);
if(!is_null($cabeceraReporte)){
    $total = 0;
    $altCell = 1;
    foreach ($cabeceraReporte as $_ca) {
        $total += floatval($_ca->total);
        $pdf->SetFont('Arial','',8);
        $pdf->Cell(50,6,utf8_decode($utils->fechaCSM($_ca->fechaCompra, 3)),'L',0,'C',$altCell);
        $pdf->Cell(50,6,'$ '.number_format($_ca->totalContado,0,',','.'),'L',0,'R',$altCell);
        $pdf->Cell(50,6,'$ '.number_format($_ca->totalCredito,0,',','.'),'L',0,'R',$altCell);
        $pdf->Cell(40,6,'$ '.number_format($_ca->totalCompra,0,',','.'),'LR',0,'R',$altCell);
        
        $pdf->Ln(6);
        if($altCell == 1){
            $altCell = 0;
        }else{
            $altCell = 1;
        }
    }
    $pdf->Cell(190,6,' ','T',0,'C');
    $pdf->Ln(6);
}
$pdf->SetY(-30);
$pdf->SetFont('Arial','',6);
$pdf->Cell(0,0,utf8_decode('Impreso por:'),0,0,'C');
$pdf->Ln(4);
$pdf->SetFont('Arial','B',7);
$pdf->Cell(0,0,utf8_decode('Indigo Tecchnologies'),0,0,'C');
$pdf->SetFont('Arial','',6);
$pdf->Ln(3);
$pdf->Cell(0,0,utf8_decode('NIT. 900.3254.221-2'),0,0,'C');
$pdf->Ln(2);
$pdf->Cell(0,0,utf8_decode('Neiva - Huila 8718324 Cel. 3157429163'),0,0,'C');
$pdf->Output();
//----------- -----------//
?>