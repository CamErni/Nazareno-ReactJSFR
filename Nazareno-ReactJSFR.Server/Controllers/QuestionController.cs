using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Nazareno_ReactJSFR.Server.Models;

namespace Nazareno_ReactJSFR.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionController : ControllerBase
    {
        private readonly QuestionDbContext _context;

        public QuestionController(QuestionDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Question>>> GetAllQuestions()
        {
            var questions = await _context.Questions.ToListAsync();
            return Ok(questions);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<Question>>> GetQuestion(int id)
        {
            var question = await _context.Questions.FindAsync(id);
            if (question is null)
            {
                return NotFound();
            }
            return Ok(question);
        }

        [HttpPost]
        public async Task<ActionResult<List<Question>>> AddQuestion(Question question)
        {
            _context.Questions.Add(question);
            await _context.SaveChangesAsync();
            return Ok(await _context.Questions.ToListAsync());
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<List<Question>>> UpdateQuestion(Question updatedQuestion)
        {
            var dbQuestion = await _context.Questions.FindAsync(updatedQuestion.Id);
            if (dbQuestion is null)
                return NotFound();
            dbQuestion.Ans = updatedQuestion.Ans;
            dbQuestion.Qst = updatedQuestion.Qst;
            await _context.SaveChangesAsync(); // Don't forget to save changes

            return Ok(await _context.Questions.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteQuestion(int id)
        {
            var question = await _context.Questions.FindAsync(id);
            _context.Questions.Remove(question);
            await _context.SaveChangesAsync(); // Don't forget to save changes
            return Ok(await _context.Questions.ToListAsync());
        }
    }
}
