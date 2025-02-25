// QuestionController.cs - Enforcing RBAC policies
using Microsoft.AspNetCore.Authorization;
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
        [Authorize] // Both examiner and examinee can access
        public async Task<ActionResult<List<Question>>> GetAllQuestions()
        {
            var questions = await _context.Questions.ToListAsync();
            return Ok(questions);
        }

        [HttpGet("{id}")]
        [Authorize] // Both roles can access
        public async Task<ActionResult<Question>> GetQuestion(int id)
        {
            var question = await _context.Questions.FindAsync(id);
            if (question is null)
            {
                return NotFound();
            }
            return Ok(question);
        }

        [HttpPost]
        [Authorize(Policy = "examineeonly")] // Only examinee can submit
        public async Task<ActionResult<Question>> AddQuestion(Question question)
        {
            _context.Questions.Add(question);
            await _context.SaveChangesAsync();
            return Ok(question);
        }

        [HttpPut("{id}")]
        [Authorize(Policy = "examineronly")] // Only examiner can update
        public async Task<ActionResult> UpdateQuestion(int id, Question updatedQuestion)
        {
            var dbQuestion = await _context.Questions.FindAsync(id);
            if (dbQuestion is null)
                return NotFound();

            dbQuestion.Qst = updatedQuestion.Qst;
            dbQuestion.Ans = updatedQuestion.Ans;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Policy = "examineronly")] // Only examiner can delete
        public async Task<ActionResult> DeleteQuestion(int id)
        {
            var question = await _context.Questions.FindAsync(id);
            if (question is null)
                return NotFound();

            _context.Questions.Remove(question);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
