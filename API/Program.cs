using System.Reflection;
using API.Data;
using API.Extensions;
using API.Middlewares;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);

builder.Services.AddScoped<ExceptionMiddleware>();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

var app = builder.Build();

/* if(builder.Environment.IsDevelopment()){
    app.UseDeveloperExceptionPage();
} */

// Configure the HTTP request pipeline.
app.UseMiddleware<ExceptionMiddleware>();

/*app.Use(async (context, next) =>
{    
    await Task.Delay(TimeSpan.FromSeconds(1));
    await next(context);
});*/

app.UseHttpsRedirection();
app.UseCors("Cors");

app.UseAuthentication(); // Do you have valid token? 
app.UseAuthorization(); // Ok, you have a valid token, what are you allowed to do?

app.MapControllers();

using var scope = app.Services.CreateScope();
var service = scope.ServiceProvider;
try
{
    var context = service.GetRequiredService<DataContext>();
    await context.Database.MigrateAsync();
    if(!context.Users.Any()){
        await Seed.SeedUsers(context);
    }    
}
catch (Exception ex)
{    
    var logger = service.GetService<ILogger<Program>>();
    logger.LogError(ex,"An error occurred during migration");    
}

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