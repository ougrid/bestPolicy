using BestPolicyReport.Models;
using BestPolicyReport.Models.OutputVatOvInReport;
using BestPolicyReport.Services.OutputVatOvInService;
using ClosedXML.Excel;
using Microsoft.AspNetCore.Mvc;

namespace BestPolicyReport.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OutputVatOvInController : ControllerBase
    {
        private readonly IOutputVatOvInService _outputVatOvInService;

        public OutputVatOvInController(IOutputVatOvInService outputVatOvInService)
        {
            _outputVatOvInService = outputVatOvInService;
        }

        [HttpPost("json")]
        public async Task<ActionResult<List<OutputVatOvInReportResult>?>> GetOutputVatOvInReportJson(OutputVatOvInReportInput data)
        {
            var result = await _outputVatOvInService.GetOutputVatOvInReportJson(data);
            if (result == null)
            {
                return Ok(new List<OutputVatOvInReportResult>());
            }
            return Ok(result);
        }


        
        [HttpPost("excel")]
        public async Task<IActionResult?> GetOutputVatOvInReportExcel(OutputVatOvInReportInput data)
        {
            var result = await _outputVatOvInService.GetOutputVatOvInReportJson(data);
            if (result == null)
            {
                return BadRequest("sql result = null");
            }
            using var workbook = new XLWorkbook();
            var sheetName = "ภาษีขาย_OvIn";
            var worksheet = workbook.Worksheets.Add(sheetName);

            // Headers
            var headers = new string[]
            {
            "เลขที่ตัดรับ", "วันที่ตัดรับ", "รหัสบริษัทประกัน", "ชื่อบริษัทประกัน", "ยอด OV รับ", "ยอดภาษีขาย OV รับ", "สถานะรายการ",
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
                worksheet.Cell(row, col++).Value = i.DfRpReferNo;
                worksheet.Cell(row, col++).Value = i.RpRefDate;
                worksheet.Cell(row, col++).Value = i.InsurerCode;
                worksheet.Cell(row, col++).Value = i.InsurerName;
                worksheet.Cell(row, col++).Value = i.OvInAmt;
                worksheet.Cell(row, col++).Value = i.VatOvInAmt;
                worksheet.Cell(row, col++).Value = i.TransactionStatus;
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
