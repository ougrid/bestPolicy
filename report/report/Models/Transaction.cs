using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace amityReport.Models
{
  public class Transaction
  {
    [Key] public int Id { get; set; }
    public string? transType { get; set; } = null!;
    // public string transType { get; set; }
    // public string transStatus { get; set; } = null!;
    public string? transStatus { get; set; }
    public int subType { get; set; }
    public string? insurerCode { get; set; } = null!;
    // public string agentGroupCode { get; set; } = null!;
    public string? agentGroupCode { get; set; }
    // public string policyNo { get; set; } = null!;
    public string? policyNo { get; set; }
    public string? agentCode { get; set; } = null!;
    public float amount { get; set; }
    public float duty { get; set; }
    public float stamp { get; set; }
    public float total { get; set; }
    public DateTime payDate { get; set; }
    // public string payNo { get; set; } = null!;
    public string? payNo { get; set; }
    public DateTime invoiceDate { get; set; }
    // public string invoiceNo { get; set; } = null!;
    public string? invoiceNo { get; set; }
    // public string endoseNo { get; set; } = null!;
    public string? endoseNo { get; set; }
    public int level { get; set; }
    public DateTime dueDate { get; set; }
    public DateTime createdAt { get; set; }
    public DateTime updatedAt { get; set; }
    public int groupSatmentID { get; set; }
    public float totalamt { get; set; }

    public float paidamt { get; set; }
    public float remainamt { get; set; }
    // public string status { get; set; } = null!;
    public string? status { get; set; }
    public int seqno { get; set; }
    public float commamt { get; set; }
    public float commtaxamt { get; set; }
    public float ovamt { get; set; }
    public float ovtaxamt { get; set; }
    public DateTime rprefdate { get; set; }

    [Column("premin-rprefdate")] public DateTime Preminrprefdate { get; set; }

    [Column("premout-rprefdate")] public DateTime Premoutrprefdate { get; set; }

  }
}
