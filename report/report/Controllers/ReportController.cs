using AspNetCore.Reporting;
using ClosedXML.Excel;
using DocumentFormat.OpenXml.Spreadsheet;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using amityReport.Models;
using report.Models;
using report.Services;
using System.Data;

namespace report.Controllers
{

    [ApiController]

    public class ReportController : Controller
    {
        private readonly ITransactionService _transactionService;
        private readonly IPolicyService _policyService;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public ReportController(ITransactionService transactionService, IPolicyService policyService, IWebHostEnvironment webHostEnvironment)
        {
            _transactionService = transactionService;
            this._webHostEnvironment = webHostEnvironment;
            _policyService = policyService;
        }
        [Route("[controller]")]
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var records = await _transactionService.GetTransactionList();
            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add("Users");
                var currentRow = 1;
                worksheet.Cell(currentRow, 1).Value = "Id";
                worksheet.Cell(currentRow, 2).Value = "transType";
                worksheet.Cell(currentRow, 3).Value = "transStatus";
                worksheet.Cell(currentRow, 4).Value = "insurerCode";
                worksheet.Cell(currentRow, 5).Value = "policyNo";
                worksheet.Cell(currentRow, 6).Value = "agentCode";
                worksheet.Cell(currentRow, 7).Value = "totalamt";

                foreach (var record in records)
                {
                    currentRow++;
                    worksheet.Cell(currentRow, 1).Value = record.Id;
                    worksheet.Cell(currentRow, 2).Value = record.transType;
                    worksheet.Cell(currentRow, 3).Value = record.transStatus;
                    worksheet.Cell(currentRow, 4).Value = record.insurerCode;
                    worksheet.Cell(currentRow, 5).Value = record.policyNo;
                    worksheet.Cell(currentRow, 6).Value = record.agentCode;
                    worksheet.Cell(currentRow, 7).Value = record.totalamt;

                }

                using (var stream = new MemoryStream())
                {
                    workbook.SaveAs(stream);
                    var content = stream.ToArray();

                    return File(
                        content,
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                        "users.xlsx");
                }
            }


        }


        [Route("[controller]/billingReport")]
        [HttpGet]
        public async Task<IActionResult> GetBillingReport()
        {
            var records = await _transactionService.GetTransactionList();
            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add("Users");
                var currentRow = 1;
                worksheet.Cell(currentRow, 1).Value = "InsurerCode";
                worksheet.Cell(currentRow, 2).Value = "AdvisorCode";
                worksheet.Cell(currentRow, 3).Value = "Duedate";
                worksheet.Cell(currentRow, 4).Value = "Policyno";
                worksheet.Cell(currentRow, 5).Value = "Endorseno";
                worksheet.Cell(currentRow, 6).Value = "Invoiceno";
                worksheet.Cell(currentRow, 7).Value = "seqno";
                worksheet.Cell(currentRow, 8).Value = "customerid";
                worksheet.Cell(currentRow, 9).Value = "insuredname";
                worksheet.Cell(currentRow, 10).Value = "licenseno";
                worksheet.Cell(currentRow, 11).Value = "province";
                worksheet.Cell(currentRow, 12).Value = "chassisno";
                worksheet.Cell(currentRow, 13).Value = "grossprem";
                worksheet.Cell(currentRow, 14).Value = "specdiscrate";
                worksheet.Cell(currentRow, 15).Value = "specdiscamt";
                worksheet.Cell(currentRow, 16).Value = "netgrossprem";
                worksheet.Cell(currentRow, 17).Value = "duty";
                worksheet.Cell(currentRow, 18).Value = "tax";
                worksheet.Cell(currentRow, 19).Value = "totalamt";
                worksheet.Cell(currentRow, 20).Value = "comm-out1%";
                worksheet.Cell(currentRow, 21).Value = "comm-out-amt1";
                worksheet.Cell(currentRow, 22).Value = "worksheet.Cell(currentRow, 19).Value = \"totalamt\";";
                worksheet.Cell(currentRow, 23).Value = "ov-out1%";
                worksheet.Cell(currentRow, 24).Value = "ov-out amt1mt";
                worksheet.Cell(currentRow, 25).Value = "comm-out2%";
                worksheet.Cell(currentRow, 26).Value = "comm-out-amt";
                worksheet.Cell(currentRow, 27).Value = "ov-out2%";
                worksheet.Cell(currentRow, 28).Value = "ov-out amt2";
                worksheet.Cell(currentRow, 29).Value = "comm-out%";
                worksheet.Cell(currentRow, 30).Value = "comm-out-amt";
                worksheet.Cell(currentRow, 31).Value = "ov-out%";
                worksheet.Cell(currentRow, 32).Value = "[]net";
                worksheet.Cell(currentRow, 32).Value = "billpremium ";


                foreach (var record in records)
                {
                    currentRow++;
                    worksheet.Cell(currentRow, 1).Value = record.Id;
                    worksheet.Cell(currentRow, 2).Value = record.transType;
                    worksheet.Cell(currentRow, 3).Value = record.transStatus;
                    worksheet.Cell(currentRow, 4).Value = record.insurerCode;
                    worksheet.Cell(currentRow, 5).Value = record.policyNo;
                    worksheet.Cell(currentRow, 6).Value = record.agentCode;
                    worksheet.Cell(currentRow, 7).Value = record.totalamt;

                }

                using (var stream = new MemoryStream())
                {
                    workbook.SaveAs(stream);
                    var content = stream.ToArray();

                    return File(
                        content,
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                        "รายงานใบวางบิล ${}.xlsx");
                }
            }


        }

        [Route("[controller]/billing")]
        [HttpPost]
        public async Task<IActionResult> GetBilling(Billing data)
        {
            var records = await _policyService.GetPolicyListbyAgent(data);
            var dateNow = DateOnly.FromDateTime(DateTime.Now);
            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add("Users");
                worksheet.Cell(1, 1).Value = "ผู้เอาประกันภัย บริษัท ออโต้บลิส จำกัด";
                worksheet.Cell(2, 1).Value = "ประกันภัยรถยนต์ภาคบังคับและภาคสมัครใจ ความคุ้มครองเดือน ธันวาคม 2566 รอบวางบิล" + dateNow;
                worksheet.Cell(3, 1).Value = "บริษัท ทิพยะประกันภัย จำกัด (มหาชน)";
                worksheet.Cell(4, 1).Value = "รายการกรมธรรม์ประกันภัย";
                worksheet.Range("A4:S4").Merge();
                worksheet.Cell(4, 20).Value = "ภาษี ณ ที่จ่าย 1%";
                worksheet.Range("T4:U4").Merge();
                var currentRow = 5;
                worksheet.Cell(currentRow, 1).Value = "ลำดับ";
                worksheet.Cell(currentRow, 2).Value = "ทะเบียน";
                worksheet.Cell(currentRow, 3).Value = "วันที่เริ่มต้น";
                worksheet.Cell(currentRow, 4).Value = "วันที่สิ้นสุด";
                worksheet.Cell(currentRow, 5).Value = "ยี่ห้อ/รุ่นรภยนต์";
                worksheet.Cell(currentRow, 6).Value = "ปีรถ";
                worksheet.Cell(currentRow, 7).Value = "ผู้เอาประกันภัย";
                worksheet.Cell(currentRow, 8).Value = "เลที่ใบกำกับภาษี";
                worksheet.Cell(currentRow, 9).Value = "เลขตัวถัง";
                worksheet.Cell(currentRow, 10).Value = "เลขที่กรมธรรม์(ประกันภัย)";
                worksheet.Cell(currentRow, 11).Value = "เบี้ยประกัน";
                worksheet.Cell(currentRow, 12).Value = "อากร";
                worksheet.Cell(currentRow, 13).Value = "ภาษี";
                worksheet.Cell(currentRow, 14).Value = "เบี้ยประกันรวม";
                worksheet.Cell(currentRow, 15).Value = "เลขที่กรมธรรม์ (พรบ.)";
                worksheet.Cell(currentRow, 16).Value = "เบี้ย พรบ.";
                worksheet.Cell(currentRow, 17).Value = "อากร พรบ.";
                worksheet.Cell(currentRow, 18).Value = "ภาษี พรบ.";
                worksheet.Cell(currentRow, 19).Value = "เบี้ย พรบ. รวม";
                worksheet.Cell(currentRow, 20).Value = "ป.1";
                worksheet.Cell(currentRow, 21).Value = "พรบ.";
                worksheet.Cell(currentRow, 22).Value = "ส่วนลด";
                worksheet.Range("A4:V5").Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                foreach (var record in records)
                {
                    currentRow++;
                    worksheet.Cell(currentRow, 1).Value = record.id;
                    //worksheet.Cell(currentRow, 2).Value = "ทะเบียน";
                    worksheet.Cell(currentRow, 3).Value = record.actDate;
                    worksheet.Cell(currentRow, 4).Value = record.expDate;
                    //worksheet.Cell(currentRow, 5).Value = "ยี่ห้อ/รุ่นรภยนต์";
                    //worksheet.Cell(currentRow, 6).Value = "ปีรถ";
                    worksheet.Cell(currentRow, 7).Value = record.insureeCode;
                    //worksheet.Cell(currentRow, 8).Value = "เลที่ใบกำกับภาษี";
                    //worksheet.Cell(currentRow, 9).Value = "เลขตัวถัง";
                    worksheet.Cell(currentRow, 10).Value = record.policyNo;
                    worksheet.Cell(currentRow, 11).Value = record.netgrossprem;
                    worksheet.Cell(currentRow, 12).Value = record.duty;
                    worksheet.Cell(currentRow, 13).Value = record.tax;
                    worksheet.Cell(currentRow, 14).Value = record.totalprem;
                    worksheet.Cell(currentRow, 15).Value = "เลขที่กรมธรรม์ (พรบ.)";
                    worksheet.Cell(currentRow, 16).Value = "เบี้ย พรบ.";
                    worksheet.Cell(currentRow, 17).Value = "อากร พรบ.";
                    worksheet.Cell(currentRow, 18).Value = "ภาษี พรบ.";
                    worksheet.Cell(currentRow, 19).Value = "เบี้ย พรบ. รวม";
                    worksheet.Cell(currentRow, 20).Value = "ป.1";
                    worksheet.Cell(currentRow, 21).Value = "พรบ.";
                    worksheet.Cell(currentRow, 22).Value = "ส่วนลด";

                }
                worksheet.Range("A4:V" + currentRow).Style.Border.InsideBorder = XLBorderStyleValues.Thin;
                worksheet.Range("A4:V" + currentRow).Style.Border.InsideBorderColor = XLColor.Black;
                worksheet.Range("A4:V" + currentRow).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
                worksheet.Range("A4:V" + currentRow).Style.Border.OutsideBorderColor = XLColor.Black;
                using (var stream = new MemoryStream())
                {
                    workbook.SaveAs(stream);
                    var content = stream.ToArray();

                    return File(
                        content,
                         "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                        "billing" + dateNow + ".xlsx");

                }
            }


        }


        [Route("[controller]/billpdf")]
        [HttpPost]
        public IActionResult Export()
        {
            var dt = new DataTable();
            dt = GetBillList();
            string mimetype = "";
            int extension = 1;

            var baseDirectory = AppContext.BaseDirectory;
            //var path = $"{this._webHostEnvironment.WebRootPath}\\Reports\\rpMotor3.rdlc";
            var path = Path.Combine(baseDirectory, "Reports", "rpMotor3.rdlc");

            Dictionary<string, string> parameters = new Dictionary<string, string>();
            parameters.Add("insuree_fullname", "บริษัท ออโต้บลิส จำกัด");
            LocalReport lr = new LocalReport(path);
            //lr.AddDataSource("dsEmployee", dt);
            var result = lr.Execute(RenderType.Pdf, extension, parameters, mimetype);
            return File(result.MainStream, "application/pdf");
        }
        private DataTable GetBillList()
        {
            var dt = new DataTable();
            dt.Columns.Add("EmpId");
            dt.Columns.Add("EmpName");
            dt.Columns.Add("Department");
            dt.Columns.Add("BirthDate");
            DataRow row;

            for (int i = 1; i < 100; i++)
            {
                row = dt.NewRow();
                row["EmpId"] = i;
                row["EmpName"] = i.ToString() + " Empl";
                row["Department"] = "XXYY";
                row["BirthDate"] = DateTime.Now.AddDays(-10000);
                dt.Rows.Add(row);
            }
            return dt;
        }

        [Route("[controller]/report-premin-openitem")] // รายงานตัดหนี้ตัวแทน ตัวตั้ง report-premin-openitem (Openitem: ตัวตั้ง, Clearing: ตัวตัด, Outstanding: คงเหลือ)
        [HttpPost]
        public async Task<IActionResult> GetPremInOpenitem(Transaction data)
        {
            var records = await _policyService.GetPolicyListByPremIn(data);
            var dateNow = DateOnly.FromDateTime(DateTime.Now);
            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add("report");
                worksheet.Cell(1, 1).Value = "รายงานตัดหนี้ตัวแทน ตัวตั้ง";
                worksheet.Cell(2, 1).Value = "ประกันภัยรถยนต์ภาคบังคับและภาคสมัครใจ ความคุ้มครองเดือน ธันวาคม 2566 รอบวางบิล" + dateNow;
                worksheet.Cell(3, 1).Value = "บริษัท ทิพยประกันภัย จำกัด (มหาชน)";
                worksheet.Cell(4, 1).Value = "รายการกรมธรรม์ประกันภัย";
                worksheet.Range("A4:AF4").Merge();
                var currentRow = 5;
                worksheet.Range("A4:AF5").Style.Font.Bold = true;
                worksheet.Range("A4:AF5").Style.Fill.BackgroundColor = XLColor.FromArgb(217, 217, 217);
                worksheet.Column(1).Width = 8;
                worksheet.Column(2).Width = 26;
                worksheet.Column(3).Width = 26;
                worksheet.Column(4).Width = 26;
                worksheet.Column(5).Width = 20;
                worksheet.Column(6).Width = 20;
                worksheet.Column(7).Width = 16;
                worksheet.Column(8).Width = 20;
                worksheet.Column(9).Width = 20;
                worksheet.Column(10).Width = 20;
                worksheet.Column(11).Width = 20;
                worksheet.Column(12).Width = 20;
                worksheet.Column(13).Width = 16;
                worksheet.Column(14).Width = 8;
                worksheet.Column(15).Width = 20;
                worksheet.Column(16).Width = 20;
                worksheet.Column(17).Width = 8;
                worksheet.Column(18).Width = 16;
                worksheet.Column(19).Width = 16;
                worksheet.Column(20).Width = 20;
                worksheet.Column(21).Width = 20;
                worksheet.Column(22).Width = 20;
                worksheet.Column(23).Width = 20;
                worksheet.Column(24).Width = 8;
                worksheet.Column(25).Width = 8;
                worksheet.Column(26).Width = 8;
                worksheet.Column(27).Width = 20;
                worksheet.Column(28).Width = 20;
                worksheet.Column(29).Width = 20;
                worksheet.Column(30).Width = 20;
                worksheet.Column(31).Width = 16;
                worksheet.Column(32).Width = 20;
                worksheet.Column(33).Width = 20;
                worksheet.Range("A4:AF5").Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;
                worksheet.Cell(currentRow, 1).Value = "ลำดับ";
                worksheet.Cell(currentRow, 2).Value = "เลขที่กรมธรรม์(ประกันภัย)";
                worksheet.Cell(currentRow, 3).Value = "เลขที่สลักหลัง (Endorse No.)";
                worksheet.Cell(currentRow, 4).Value = "Invoice No.";
                worksheet.Cell(currentRow, 5).Value = "Sequence No.";
                worksheet.Cell(currentRow, 6).Value = "เลขที่ Cashier";
                worksheet.Cell(currentRow, 7).Value = "วันที่ Cashier";
                worksheet.Cell(currentRow, 8).Value = "Cashier Amount";
                worksheet.Cell(currentRow, 9).Value = "Cashier Receive Type";
                worksheet.Cell(currentRow, 10).Value = "Cashier Reference No.";
                worksheet.Cell(currentRow, 11).Value = "Cashier Reference Date";
                worksheet.Cell(currentRow, 12).Value = "เลขที่ตัดหนี้ PREM-IN";
                worksheet.Cell(currentRow, 13).Value = "วันที่ตัดหนี้";
                worksheet.Cell(currentRow, 14).Value = "Net Flag";
                worksheet.Cell(currentRow, 15).Value = "จำนวนเงินตัดหนี้";
                worksheet.Cell(currentRow, 16).Value = "Difference Amount";
                worksheet.Cell(currentRow, 17).Value = "สถานะ";
                worksheet.Cell(currentRow, 18).Value = "Effective Date";
                worksheet.Cell(currentRow, 19).Value = "Expiry Date";
                worksheet.Cell(currentRow, 20).Value = "Advisor Code";
                worksheet.Cell(currentRow, 21).Value = "Advisor Name";
                worksheet.Cell(currentRow, 22).Value = "Customer ID";
                worksheet.Cell(currentRow, 23).Value = "Customer Name";
                worksheet.Cell(currentRow, 24).Value = "Class";
                worksheet.Cell(currentRow, 25).Value = "Subclass";
                worksheet.Cell(currentRow, 26).Value = "Duty";
                worksheet.Cell(currentRow, 27).Value = "Tax";
                worksheet.Cell(currentRow, 28).Value = "Total Prem";
                worksheet.Cell(currentRow, 29).Value = "Comm-out%";
                worksheet.Cell(currentRow, 30).Value = "Comm-out Amount";
                worksheet.Cell(currentRow, 31).Value = "OV-out%";
                worksheet.Cell(currentRow, 32).Value = "OV-out Amount";

                foreach (var record in records)
                {
                    currentRow++;
                    worksheet.Cell(currentRow, 1).Value = record.Id;
                    worksheet.Cell(currentRow, 2).Value = record.policyNo;
                    worksheet.Cell(currentRow, 3).Value = record.endoseNo;
                    //worksheet.Cell(currentRow, 4).Value = record.expDate;
                    //worksheet.Cell(currentRow, 5).Value = "ยี่ห้อ/รุ่นรภยนต์";
                    //worksheet.Cell(currentRow, 6).Value = "ปีรถ";
                    //worksheet.Cell(currentRow, 7).Value = record.insureeCode;
                    //worksheet.Cell(currentRow, 8).Value = "เลที่ใบกำกับภาษี";
                    //worksheet.Cell(currentRow, 9).Value = "เลขตัวถัง";
                    worksheet.Cell(currentRow, 10).Value = record.policyNo;
                    //worksheet.Cell(currentRow, 11).Value = record.netgrossprem;
                    worksheet.Cell(currentRow, 12).Value = record.duty;
                    //worksheet.Cell(currentRow, 13).Value = record.tax;
                    //worksheet.Cell(currentRow, 14).Value = record.totalprem;

                }
                worksheet.Range("A4:AF" + currentRow).Style.Border.InsideBorder = XLBorderStyleValues.Thin;
                worksheet.Range("A4:AF" + currentRow).Style.Border.InsideBorderColor = XLColor.Black;
                worksheet.Range("A4:AF" + currentRow).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
                worksheet.Range("A4:AF" + currentRow).Style.Border.OutsideBorderColor = XLColor.Black;
                using (var stream = new MemoryStream())
                {
                    workbook.SaveAs(stream);
                    var content = stream.ToArray();

                    return File(
                        content,
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                        "report-premin-outstanding_" + dateNow + ".xlsx");
                }
            }
        }

    }

    [Route("[controller]/report-premin-clearing")] // รายงานตัดหนี้ตัวแทน ตัวตัด report-premin-clearing
    [HttpPost]
    public async Task<IActionResult> GetPremInClearing(Transaction data)
    {
        var records = await _policyService.GetPolicyListByPremIn(data);
        var dateNow = DateOnly.FromDateTime(DateTime.Now);
        using (var workbook = new XLWorkbook())
        {
            var worksheet = workbook.Worksheets.Add("report");
            worksheet.Cell(1, 1).Value = "รายงานตัดหนี้ตัวแทน ตัวตัด";
            worksheet.Cell(2, 1).Value = "ประกันภัยรถยนต์ภาคบังคับและภาคสมัครใจ ความคุ้มครองเดือน ธันวาคม 2566 รอบวางบิล" + dateNow;
            worksheet.Cell(3, 1).Value = "บริษัท ทิพยประกันภัย จำกัด (มหาชน)";
            worksheet.Cell(4, 1).Value = "รายการกรมธรรม์ประกันภัย";
            worksheet.Range("A4:AF4").Merge();
            var currentRow = 5;
            worksheet.Range("A4:AF5").Style.Font.Bold = true;
            worksheet.Range("A4:AF5").Style.Fill.BackgroundColor = XLColor.FromArgb(217, 217, 217);
            worksheet.Column(1).Width = 8;
            worksheet.Column(2).Width = 26;
            worksheet.Column(3).Width = 26;
            worksheet.Column(4).Width = 26;
            worksheet.Column(5).Width = 20;
            worksheet.Column(6).Width = 20;
            worksheet.Column(7).Width = 16;
            worksheet.Column(8).Width = 20;
            worksheet.Column(9).Width = 20;
            worksheet.Column(10).Width = 20;
            worksheet.Column(11).Width = 20;
            worksheet.Column(12).Width = 20;
            worksheet.Column(13).Width = 16;
            worksheet.Column(14).Width = 8;
            worksheet.Column(15).Width = 20;
            worksheet.Column(16).Width = 20;
            worksheet.Column(17).Width = 8;
            worksheet.Column(18).Width = 16;
            worksheet.Column(19).Width = 16;
            worksheet.Column(20).Width = 20;
            worksheet.Column(21).Width = 20;
            worksheet.Column(22).Width = 20;
            worksheet.Column(23).Width = 20;
            worksheet.Column(24).Width = 8;
            worksheet.Column(25).Width = 8;
            worksheet.Column(26).Width = 8;
            worksheet.Column(27).Width = 20;
            worksheet.Column(28).Width = 20;
            worksheet.Column(29).Width = 20;
            worksheet.Column(30).Width = 20;
            worksheet.Column(31).Width = 16;
            worksheet.Column(32).Width = 20;
            worksheet.Column(33).Width = 20;
            worksheet.Range("A4:AF5").Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;
            worksheet.Cell(currentRow, 1).Value = "ลำดับ";
            worksheet.Cell(currentRow, 2).Value = "เลขที่กรมธรรม์(ประกันภัย)";
            worksheet.Cell(currentRow, 3).Value = "เลขที่สลักหลัง (Endorse No.)";
            worksheet.Cell(currentRow, 4).Value = "Invoice No.";
            worksheet.Cell(currentRow, 5).Value = "Sequence No.";
            worksheet.Cell(currentRow, 6).Value = "เลขที่ Cashier";
            worksheet.Cell(currentRow, 7).Value = "วันที่ Cashier";
            worksheet.Cell(currentRow, 8).Value = "Cashier Amount";
            worksheet.Cell(currentRow, 9).Value = "Cashier Receive Type";
            worksheet.Cell(currentRow, 10).Value = "Cashier Reference No.";
            worksheet.Cell(currentRow, 11).Value = "Cashier Reference Date";
            worksheet.Cell(currentRow, 12).Value = "เลขที่ตัดหนี้ PREM-IN";
            worksheet.Cell(currentRow, 13).Value = "วันที่ตัดหนี้";
            worksheet.Cell(currentRow, 14).Value = "Net Flag";
            worksheet.Cell(currentRow, 15).Value = "จำนวนเงินตัดหนี้";
            worksheet.Cell(currentRow, 16).Value = "Difference Amount";
            worksheet.Cell(currentRow, 17).Value = "สถานะ";
            worksheet.Cell(currentRow, 18).Value = "Effective Date";
            worksheet.Cell(currentRow, 19).Value = "Expiry Date";
            worksheet.Cell(currentRow, 20).Value = "Advisor Code";
            worksheet.Cell(currentRow, 21).Value = "Advisor Name";
            worksheet.Cell(currentRow, 22).Value = "Customer ID";
            worksheet.Cell(currentRow, 23).Value = "Customer Name";
            worksheet.Cell(currentRow, 24).Value = "Class";
            worksheet.Cell(currentRow, 25).Value = "Subclass";
            worksheet.Cell(currentRow, 26).Value = "Duty";
            worksheet.Cell(currentRow, 27).Value = "Tax";
            worksheet.Cell(currentRow, 28).Value = "Total Prem";
            worksheet.Cell(currentRow, 29).Value = "Comm-out% 1";
            worksheet.Cell(currentRow, 30).Value = "Comm-out Amount 1";
            worksheet.Cell(currentRow, 31).Value = "OV-out% 1";
            worksheet.Cell(currentRow, 32).Value = "OV-out Amount 1";
            worksheet.Cell(currentRow, 33).Value = "??? 2";
            worksheet.Cell(currentRow, 34).Value = "??? 2";
            foreach (var record in records)
            {
                currentRow++;
                // worksheet.Cell(currentRow, 1).Value = record.Id;
                // worksheet.Cell(currentRow, 2).Value = record.policyNo;
                // worksheet.Cell(currentRow, 3).Value = record.endoseNo;
                // //worksheet.Cell(currentRow, 4).Value = record.expDate;
                // //worksheet.Cell(currentRow, 5).Value = "ยี่ห้อ/รุ่นรภยนต์";
                // //worksheet.Cell(currentRow, 6).Value = "ปีรถ";
                // //worksheet.Cell(currentRow, 7).Value = record.insureeCode;
                // //worksheet.Cell(currentRow, 8).Value = "เลขที่ใบกำกับภาษี";
                // //worksheet.Cell(currentRow, 9).Value = "เลขตัวถัง";
                // worksheet.Cell(currentRow, 10).Value = record.policyNo;
                // //worksheet.Cell(currentRow, 11).Value = record.netgrossprem;
                // worksheet.Cell(currentRow, 12).Value = record.duty;
                // //worksheet.Cell(currentRow, 13).Value = record.tax;
                // //worksheet.Cell(currentRow, 14).Value = record.totalprem;

            }
            worksheet.Range("A4:AF" + currentRow).Style.Border.InsideBorder = XLBorderStyleValues.Thin;
            worksheet.Range("A4:AF" + currentRow).Style.Border.InsideBorderColor = XLColor.Black;
            worksheet.Range("A4:AF" + currentRow).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
            worksheet.Range("A4:AF" + currentRow).Style.Border.OutsideBorderColor = XLColor.Black;
            using (var stream = new MemoryStream())
            {
                workbook.SaveAs(stream);
                var content = stream.ToArray();

                return File(
                    content,
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    "report-premin-outstanding_" + dateNow + ".xlsx");
            }
        }
    }


    [Route("[controller]/report-premin-outstanding")] // รายงานตัดหนี้ตัวแทน คงเหลือ report-premin-balance
    [HttpPost]
    public async Task<IActionResult> GetPremInOutstanding(Transaction data)
    {
        var records = await _policyService.GetPolicyListByPremIn(data);
        var dateNow = DateOnly.FromDateTime(DateTime.Now);
        using (var workbook = new XLWorkbook())
        {
            var worksheet = workbook.Worksheets.Add("report");
            worksheet.Cell(1, 1).Value = "รายงานตัดหนี้ตัวแทน คงเหลือ";
            worksheet.Cell(2, 1).Value = "ประกันภัยรถยนต์ภาคบังคับและภาคสมัครใจ ความคุ้มครองเดือน ธันวาคม 2566 รอบวางบิล" + dateNow;
            worksheet.Cell(3, 1).Value = "บริษัท ทิพยประกันภัย จำกัด (มหาชน)";
            worksheet.Cell(4, 1).Value = "รายการกรมธรรม์ประกันภัย";
            worksheet.Range("A4:AF4").Merge();
            var currentRow = 5;
            worksheet.Range("A4:AF5").Style.Font.Bold = true;
            worksheet.Range("A4:AF5").Style.Fill.BackgroundColor = XLColor.FromArgb(217, 217, 217);
            worksheet.Column(1).Width = 8;
            worksheet.Column(2).Width = 26;
            worksheet.Column(3).Width = 26;
            worksheet.Column(4).Width = 26;
            worksheet.Column(5).Width = 20;
            worksheet.Column(6).Width = 20;
            worksheet.Column(7).Width = 16;
            worksheet.Column(8).Width = 20;
            worksheet.Column(9).Width = 20;
            worksheet.Column(10).Width = 20;
            worksheet.Column(11).Width = 20;
            worksheet.Column(12).Width = 20;
            worksheet.Column(13).Width = 16;
            worksheet.Column(14).Width = 8;
            worksheet.Column(15).Width = 20;
            worksheet.Column(16).Width = 20;
            worksheet.Column(17).Width = 8;
            worksheet.Column(18).Width = 16;
            worksheet.Column(19).Width = 16;
            worksheet.Column(20).Width = 20;
            worksheet.Column(21).Width = 20;
            worksheet.Column(22).Width = 20;
            worksheet.Column(23).Width = 20;
            worksheet.Column(24).Width = 8;
            worksheet.Column(25).Width = 8;
            worksheet.Column(26).Width = 8;
            worksheet.Column(27).Width = 20;
            worksheet.Column(28).Width = 20;
            worksheet.Column(29).Width = 20;
            worksheet.Column(30).Width = 20;
            worksheet.Column(31).Width = 16;
            worksheet.Column(32).Width = 20;
            worksheet.Column(33).Width = 20;
            worksheet.Range("A4:AF5").Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;
            worksheet.Cell(currentRow, 1).Value = "ลำดับ";
            worksheet.Cell(currentRow, 2).Value = "เลขที่กรมธรรม์(ประกันภัย)";
            worksheet.Cell(currentRow, 3).Value = "เลขที่สลักหลัง (Endorse No.)";
            worksheet.Cell(currentRow, 4).Value = "Invoice No.";
            worksheet.Cell(currentRow, 5).Value = "Sequence No.";
            worksheet.Cell(currentRow, 6).Value = "เลขที่ Cashier";
            worksheet.Cell(currentRow, 7).Value = "วันที่ Cashier";
            worksheet.Cell(currentRow, 8).Value = "Cashier Amount";
            worksheet.Cell(currentRow, 9).Value = "Cashier Receive Type";
            worksheet.Cell(currentRow, 10).Value = "Cashier Reference No.";
            worksheet.Cell(currentRow, 11).Value = "Cashier Reference Date";
            worksheet.Cell(currentRow, 12).Value = "เลขที่ตัดหนี้ PREM-IN";
            worksheet.Cell(currentRow, 13).Value = "วันที่ตัดหนี้";
            worksheet.Cell(currentRow, 14).Value = "Net Flag";
            worksheet.Cell(currentRow, 15).Value = "จำนวนเงินตัดหนี้";
            worksheet.Cell(currentRow, 16).Value = "Difference Amount";
            worksheet.Cell(currentRow, 17).Value = "สถานะ";
            worksheet.Cell(currentRow, 18).Value = "Effective Date";
            worksheet.Cell(currentRow, 19).Value = "Expiry Date";
            worksheet.Cell(currentRow, 20).Value = "Advisor Code";
            worksheet.Cell(currentRow, 21).Value = "Advisor Name";
            worksheet.Cell(currentRow, 22).Value = "Customer ID";
            worksheet.Cell(currentRow, 23).Value = "Customer Name";
            worksheet.Cell(currentRow, 24).Value = "Class";
            worksheet.Cell(currentRow, 25).Value = "Subclass";
            worksheet.Cell(currentRow, 26).Value = "Duty";
            worksheet.Cell(currentRow, 27).Value = "Tax";
            worksheet.Cell(currentRow, 28).Value = "Total Prem";
            worksheet.Cell(currentRow, 29).Value = "Comm-out% 1";
            worksheet.Cell(currentRow, 30).Value = "Comm-out Amount 1";
            worksheet.Cell(currentRow, 31).Value = "OV-out% 1";
            worksheet.Cell(currentRow, 32).Value = "OV-out Amount 1";
            worksheet.Cell(currentRow, 33).Value = "??? 2";
            worksheet.Cell(currentRow, 34).Value = "??? 2";
            foreach (var record in records)
            {
                currentRow++;
                // worksheet.Cell(currentRow, 1).Value = record.Id;
                // worksheet.Cell(currentRow, 2).Value = record.policyNo;
                // worksheet.Cell(currentRow, 3).Value = record.endoseNo;
                // //worksheet.Cell(currentRow, 4).Value = record.expDate;
                // //worksheet.Cell(currentRow, 5).Value = "ยี่ห้อ/รุ่นรภยนต์";
                // //worksheet.Cell(currentRow, 6).Value = "ปีรถ";
                // //worksheet.Cell(currentRow, 7).Value = record.insureeCode;
                // //worksheet.Cell(currentRow, 8).Value = "เลขที่ใบกำกับภาษี";
                // //worksheet.Cell(currentRow, 9).Value = "เลขตัวถัง";
                // worksheet.Cell(currentRow, 10).Value = record.policyNo;
                // //worksheet.Cell(currentRow, 11).Value = record.netgrossprem;
                // worksheet.Cell(currentRow, 12).Value = record.duty;
                // //worksheet.Cell(currentRow, 13).Value = record.tax;
                // //worksheet.Cell(currentRow, 14).Value = record.totalprem;

            }
            worksheet.Range("A4:AF" + currentRow).Style.Border.InsideBorder = XLBorderStyleValues.Thin;
            worksheet.Range("A4:AF" + currentRow).Style.Border.InsideBorderColor = XLColor.Black;
            worksheet.Range("A4:AF" + currentRow).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
            worksheet.Range("A4:AF" + currentRow).Style.Border.OutsideBorderColor = XLColor.Black;
            using (var stream = new MemoryStream())
            {
                workbook.SaveAs(stream);
                var content = stream.ToArray();

                return File(
                    content,
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    "report-premin-outstanding_" + dateNow + ".xlsx");
            }
        }
    }



    [Route("[controller]/json")]
    [HttpPost]
    public async Task<IActionResult> AddEmployee([FromBody] Billing data)
    {

        var result = await _policyService.GetPolicyListbyAgent(data);


        return Ok(result);
    }

    //[HttpPut]
    //public async Task<IActionResult> UpdateEmployee([FromBody] Employee employee)
    //{
    //    var result = await _transactionService.UpdateEmployee(employee);

    //    return Ok(result);
    //}

    //[HttpDelete("{id:int}")]
    //public async Task<IActionResult> DeleteEmployee(int id)
    //{
    //    var result = await _transactionService.DeleteEmployee(id);

    //    return Ok(result);
    //}

    // [Route("Report/reportpreminoutstanding")] // รายงานตัดหนี้ตัวแทน ตัวตั้ง report-premin-outstanding

    // [Route("[controller]/advisor-premin-debtwriteoff-deduct")] // รายงานตัดหนี้ตัวแทน ตัวตัด report-premin-... 
    // [Route("[controller]/advisor-premin-debtwriteoff-balance")] // รายงานตัดหนี้ตัวแทน คงเหลือ report-premin-...
}
}


