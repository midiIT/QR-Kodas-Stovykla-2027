using Microsoft.AspNetCore.Mvc;
using QRStovykla.API.Models;

namespace QRStovykla.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccessController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public AccessController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost]
        public IActionResult Access([FromBody] AccessRequest request)
        {
            var correctPassword = _configuration["Access:Password"];

            if (request.Password != correctPassword)
            {
                return Unauthorized(new
                {
                    message = "Invalid password"
                });
            }

            return Ok(new
            {
                redirectUrl = $"{Request.Scheme}://{Request.Host}/api/access/open"
            });
        }
        [HttpGet("open")]
        public IActionResult Open()
        {
            var driveUrl = _configuration["Access:DriveUrl"];

            if (string.IsNullOrWhiteSpace(driveUrl))
            {
                return StatusCode(500);
            }

            return Redirect(driveUrl);
        }
    }
}
