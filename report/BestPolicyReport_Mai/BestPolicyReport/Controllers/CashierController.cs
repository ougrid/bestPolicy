using BestPolicyReport.Models.CashierReport;
using BestPolicyReport.Services.CashierService;
using ClosedXML.Excel;
using Microsoft.AspNetCore.Mvc;

namespace BestPolicyReport.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CashierController : ControllerBase
    {
        private readonly ICashierService _cashierService;

        public CashierController(ICashierService cashierService)
        {
            _cashierService = cashierService;
        }

        [HttpPost("json")]
        public async Task<ActionResult<List<CashierReportResult>?>> GetCashierReportJson(CashierReportInput data)
        {
            var result = await _cashierService.GetCashierReportJson(data);
            if (result == null)
            {
                return Ok(new List<CashierReportResult>());
            }
            return Ok(result);
        }

        [HttpPost("excel")]
        public async Task<IActionResult?> GetCashierReportExcel(CashierReportInput data)
        {
            var result = await _cashierService.GetCashierReportJson(data);
            if (result == null)
            {
                return BadRequest("sql result = null");
            }
            using var workbook = new XLWorkbook();
            var sheetName = "ใบรับเงิน";
            var worksheet = workbook.Worksheets.Add(sheetName);

            // Headers
            var headers = new string[]
            {
            "เลขใบรับเงิน", "วันที่รับเงิน", "BillAdvisorNo", "วันที่ออกใบวางบิล", "ReceiveFrom", "ReceiveName", "ReceiveType",
            "RefNo", "RefDate", "TransactionType", "CashierAmt", "เลขที่ตัดชำระ", "วันที่ตัดชำระ",
            "จำนวนเงินตัดชำระ", "จำนวนเงินคงเหลือ", "สถานะรายการ"
            };

            for (int col = 1; col <= headers.Length; col++)
            {
                worksheet.Cell(1, col).Value = headers[col - 1];
            }

            // Data
            int row = 2;
            foreach (var i in result)
            {
                int col = 1;
                worksheet.Cell(row, col++).Value = i.CashierReceiveNo;
                worksheet.Cell(row, col++).Value = i.CashierDate;
                worksheet.Cell(row, col++).Value = i.BillAdvisorNo;
                worksheet.Cell(row, col++).Value = i.BillDate;
                worksheet.Cell(row, col++).Value = i.ReceiveFrom;
                worksheet.Cell(row, col++).Value = i.ReceiveName;
                worksheet.Cell(row, col++).Value = i.ReceiveType;
                worksheet.Cell(row, col++).Value = i.RefNo;
                worksheet.Cell(row, col++).Value = i.RefDate;
                worksheet.Cell(row, col++).Value = i.TransactionType;
                worksheet.Cell(row, col++).Value = i.CashierAmt;
                worksheet.Cell(row, col++).Value = i.DfRpReferNo;
                worksheet.Cell(row, col++).Value = i.RpRefDate;
                worksheet.Cell(row, col++).Value = i.ActualValue;
                worksheet.Cell(row, col++).Value = i.DiffAmt;
                worksheet.Cell(row, col++).Value = i.Status;
                row++;
            }

            var tableRange = worksheet.RangeUsed();
            var table = tableRange.AsTable();
            table.Name = "Table";
            table.ShowAutoFilter = true;
            worksheet.Columns().AdjustToContents();

            using var stream = new MemoryStream();
            workbook.SaveAs(stream);
            var content = stream.ToArray();

            return File(
                content,
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                $"รายงาน{sheetName}.xlsx");
        }
    }
}
