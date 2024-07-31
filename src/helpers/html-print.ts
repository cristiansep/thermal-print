

export const htmlContent = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Create Booking Variable</title>
  <style type="text/css">
        body {
            margin: 0px;
        }

        .mainHeader-1 {
            background-color: white;
            width: 290px;
        }

        .mainLogoTd {
            height: 80px;
            border: none;
        }

        .LogotableStyle {
            border: 0;
            width: 100%;
            text-align: center;
            padding-top: 0;
            padding-bottom: 0;
        }

        .padding30 {
            padding-top: 30px;
        }

        .Hey-cutomer {
            font-family: sans-serif;
            font-size: 14px;
            font-weight: 500;
            letter-spacing: 0.3px;
            text-align: left;
            color: #1f1f1f;
        }

        .Trip-Details {
            font-family: sans-serif;
            font-size: 14px;
            line-height: 1.4;
            letter-spacing: 0.3px;
            text-align: left;
            font-weight: bold;
            color: #242424;
        }

        .pickAddress {
            font-family: sans-serif;
            font-size: 12px;
            letter-spacing: 0.3px;
            color: #262626;
        }

        .LeftText {
            font-family: sans-serif;
            font-size: 12px;
            letter-spacing: 0.3px;
            text-align: left;
            color: #000000;
        }

        .RightText {
            font-family: sans-serif;
            font-size: 12px;
            font-weight: bold;
            letter-spacing: 0.3px;
            text-align: right;
            color: #000000;
        }

        .Fare-Details {
            font-family: sans-serif;
            font-size: 14px;
            line-height: .87;
            color: #1f1f1f;
        }

        .Fare-Details1 {
            font-family: sans-serif;
            color: #1f1f1f;
            font-size: 18px;
            line-height: .87;
            font-weight: bold;
        }

        .Float-text {
            float: right;
        }

        .Clear-all {
            clear: both;
        }

        .Visibilty {
            visibility: hidden;
        }

        .Total-Fair-1 {
            font-size: 14px;
            font-weight: 600;
            text-align: right;
            padding-top: 5px;
        }

        .Text-Right {
            text-align: right;
        }

        .AddressDetails {
            font-family: sans-serif;
            font-size: 14px;
            line-height: .87;
            text-align: left;
            font-weight: bold;
            color: #1f1f1f;
        }

        .ObservationText {
            font-family: sans-serif;
            font-size: 12px;
            line-height: .87;
            text-align: left;
            color: #1f1f1f;
            border: 2px solid #1f1f1f;
        }

        .bottomtext {
            font-family: sans-serif;
            font-size: 11px;
            line-height: .87;
            text-align: left;
            color: #1f1f1f;
        }

        .tableStyleWithoutPadding {
            width: 100%;
        }

        pre {
            font-family: sans-serif;
            padding: 4px;
            margin: 4px;
            white-space: pre-wrap;
            word-break: break-word;
        }

        .createdText {
            color: orange;
            font-size: 10px;
        }
  </style>
 
</head>
<body onload="printAndClose()" style="width:290px;">
  <!-- Contenido del documento HTML (igual que antes) -->
  <table class="mainHeader-1" style="table-layout: fixed;">
      <tr>
          <td>
              <table class="LogotableStyle">
                  <tr>
                      <td class="mainLogoTd">
                          <img src="https://mcusercontent.com/b585e65611799eae7e8631341/images/51fa0050-b523-4dd5-d948-b76c49d0b3af.jpg" alt="Logo" style="width:70%;">
                      </td>
                  </tr>
              </table>
          </td>
      </tr>
      <tr>
          <td>
              <table style="border:0;padding-top:30px;width:100%;">
                  <tr>
                      <td style="text-align:center">
                          <p style="font-size:10px">Reserva #3925614</p>
                          <img src="https://s3.amazonaws.com/transvip/staging/booking_QR_code_images/booking_bar_code_3925614" height="150px" width="150px"/>
                          <h1 style="font-size:18px;text-align:center;">PAGADA</h1>
                      </td>
                  </tr>
                  <tr class="Hey-cutomer">
                      <td>Pilot Pilot</td>
                  </tr>
                  <tr class="Hey-cutomer">
                      <td>Reserva #3925614<span class="createdText"> CREADA</span></td>
                  </tr>
                  <tr class="Hey-cutomer">
                      <td>
                          <span class="Fare-Details">Hora de venta</span> 
                          <span class="Fare-Details1">26 jul. 14:56 hrs</span>
                      </td>
                  </tr>
                  <tr class="Hey-cutomer">
                      <td style="padding-top:15px;" colspan="2">Taxi</td>
                  </tr>
                  <tr class="Fare-Details">
                      <td class="padding30" colspan="2">
                          <span><b>Pasajeros</b></span>
                          <span class="Float-text"><b>1</b></span>
                          <span class="Clear-all"></span>
                      </td>
                  </tr>
                  <tr class="Fare-Details">
                      <td class="padding30" colspan="2">
                          <span>Tarifa Variable</span>
                          <span class="Float-text"><b>PERSONAL</b></span>
                          <span class="Clear-all"></span>
                      </td>
                  </tr>
                  <tr class="Trip-Details">
                      <td class="padding30" colspan="2">
                          <table class="tableStyleWithoutPadding">
                              <tr>
                                  <td>Tarifa Normal</td>
                                  <td class="Text-Right">$ 24.250</td>
                              </tr>
                              <tr>
                                  <td>Tarifa a pagar</td>
                                  <td class="Text-Right">$ 24.250</td>
                              </tr>
                              <tr>
                                  <td class="Visibilty"></td>
                                  <td class="Total-Fair-1">Efectivo Pesos</td>
                              </tr>
                          </table>
                      </td>
                  </tr>
                  <tr>
                      <td class="padding30" colspan="2">
                          <span class="AddressDetails">Trayecto</span>
                      </td>
                  </tr>
                  <tr>
                      <td class="pickAddress">Desde: Aeropuerto SCL, Pudahuel, Región Metropolitana</td>
                  </tr>
                  <tr>
                      <td class="pickAddress">Hacia: Vitacura, Región Metropolitana</td>
                  </tr>
              </table>
          </td>
      </tr>
      <tr>
          <td style="padding-top:20px;">
              <table style="width:100%;table-layout: fixed;"></table>
          </td>
      </tr>
      <tr>
          <td style="padding-top:20px;">
              <table style="width:100%;">
                  <tr>
                      <td class="LeftText" colspan="2" style="font-weight: bold;">Datos adicionales</td>
                  </tr>
                  <tr>
                      <td>
                          <table style="width:100%;">
                              <tr>
                                  <td class="LeftText">Solicitada por: Pilot Pilot</td>
                              </tr>
                              <tr>
                                  <td class="bottomtext padding30">(*) Los valores pueden estar sujeto a modificaciones según convenio.</td>
                              </tr>
                          </table>
                      </td>
                  </tr>
              </table>
          </td>
      </tr>
      <tr>
          <td style="padding-top:20px">
              <table style="width:100%;">
                  <tr>
                      <td class="LeftText" colspan="2" style="font-weight: bold;">Datos adicionales</td>
                  </tr>
                  <tr>
                      <td class="LeftText">Cajero: Cristian Sepulveda</td>
                      <td>Impresión: 1</td>
                  </tr>
                  <tr>
                      <td class="LeftText" colspan="2">Fecha & Hora Impresión: 26/07/2024 14:55</td>
                  </tr>
              </table>
          </td>
      </tr>
      <tr>
          <td style="padding-top:20px">
              <table style="width:100%;border-top:2px solid black;">
                  <tr>
                      <td class="LeftText">Página web: www.transvip.cl</td>
                  </tr>
                  <tr>
                      <td class="LeftText">Teléfono: +562 2677 3000</td>
                  </tr>
                  <tr>
                      <td class="LeftText">eMail: info@transvip.cl</td>
                  </tr>
              </table>
          </td>
      </tr>
  </table>
</body>
</html>`;