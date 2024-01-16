using API.Extensions;
using API.Middlewares;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);

builder.Services.AddScoped<ExceptionMiddleware>();

var app = builder.Build();

/* if(builder.Environment.IsDevelopment()){
    app.UseDeveloperExceptionPage();
} */

// Configure the HTTP request pipeline.
app.UseMiddleware<ExceptionMiddleware>();

app.UseHttpsRedirection();
app.UseCors("Cors");

app.UseAuthentication(); // Do you have valid token? 
app.UseAuthorization(); // Ok, you have a valid token, what are you allowed to do?

app.MapControllers();

app.Run();


/* 

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
 */