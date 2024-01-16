using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities;

[Table("Photos")]
public class Photo
{
  public int Id { get; set; }
  public string Url { get; set; }
  public bool IsMain { get; set; }
  public string PublicId { get; set; }

  /* Navigation Property  */
  // By default, AppUserId will be created with allow nulls when specified only in AppUser entity as navigation Property, so to make it required, we need to specify here as well in Photos entity  
  public int AppUserId { get; set; }   
  public AppUser AppUser { get; set; }
}