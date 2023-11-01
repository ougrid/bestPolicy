using BestPolicyReport.Models;
using BestPolicyReport.Models.OutputVatCommInReport;
using BestPolicyReport.Services.OutputVatCommInService;
using ClosedXML.Excel;
using Microsoft.AspNetCore.Mvc;

namespace BestPolicyReport.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OutputVatCommInController : ControllerBase
    {
        private readonly IOutputVatCommInService _outputVatCommInService;

        public OutputVatCommInController(IOutputVatCommInService outputVatCommInService)
        {
            _outputVatCommInService = outputVatCommInService;
        }

        [HttpPost("json")]
        public async Task<ActionResult<List<OutputVatCommInReportResult>?>> GetOutputVatCommInReportJson(OutputVatCommInReportInput data)
        {
            var result = await _outputVatCommInService.GetOutputVatCommInReportJson(data);
            if (result == null)
            {
                return Ok(new List<OutputVatCommInReportResult>());
            }
            return Ok(result);
        }


        
        [HttpPost("excel")]
        public async Task<IActionResult?> GetOutputVatCommInReportExcel(OutputVatCommInReportInput data)
        {
            var result = await _outputVatCommInService.GetOutputVatCommInReportJson(data);
            if (result == null)
            {
                return BadRequest("sql result = null");
            }
            using var workbook = new XLWorkbook();
            var sheetName = "ภาษีขาย_CommIn";
            var worksheet = workbook.Worksheets.Add(sheetName);

            // Headers
            var headers = new string[]
            {
            "เลขที่ตัดรับ", "วันที่ตัดรับ", "รหัสบริษัทประกัน", "ชื่อบริษัทประกัน", "ยอดคอมมิชชั่นรับ", "ยอดภาษีขายคอมมิชชั่นรับ", "สถานะ",
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
                worksheet.Cell(row, col++).Value = i.CommInAmt;
                worksheet.Cell(row, col++).Value = i.VatCommInAmt;
                worksheet.Cell(row, col++).Value = i.TransactionStatus;
                row++;
            }

            var tableRange = worksheet.RangeUsed();
            var table = tableRange.AsTable();
            table.Name = "Table";
            table.ShowAutoFilter = true;

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
