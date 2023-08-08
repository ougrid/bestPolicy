using ClosedXML.Excel;
using Microsoft.AspNetCore.Mvc;
using report.Services;

namespace report.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class TransactionController : Controller
    {
        private readonly ITransactionService _transactionService;

        public TransactionController(ITransactionService transactionService)
        {
            _transactionService = transactionService;
        }

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

        //[HttpGet("{id:int}")]
        //public async Task<IActionResult> GetEmployee(int id)
        //{
        //    var result = await _transactionService.GetEmployee(id);

        //    return Ok(result);
        //}

        //[HttpPost]
        //public async Task<IActionResult> AddEmployee([FromBody] Employee employee)
        //{
        //    var result = await _transactionService.CreateEmployee(employee);

        //    return Ok(result);
        //}

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
    }
}
