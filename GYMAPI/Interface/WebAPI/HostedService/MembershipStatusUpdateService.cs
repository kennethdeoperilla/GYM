using GYMAPI.Core.Application.MembershipStatus.Commands.UpdateAllMembershipStatus;
using MediatR;

namespace GYMAPI.Interface.HostedService
{
  public class MembershipStatusUpdateService : BackgroundService, IDisposable
  {
    private readonly IServiceScopeFactory serviceScopeFactory;

    public MembershipStatusUpdateService(IServiceScopeFactory serviceScopeFactory)
    {
      this.serviceScopeFactory = serviceScopeFactory;
    }

    protected override Task ExecuteAsync(CancellationToken stoppingToken)
    {
      Task.Run(() => DoWork());

      return Task.CompletedTask;
    }
    public override Task StopAsync(CancellationToken cancellationToken)
    {
      return base.StopAsync(cancellationToken);
    }
    private async void DoWork()
    {
      try
      {
        using var scope = this.serviceScopeFactory.CreateScope();
        var mediator = scope.ServiceProvider.GetRequiredService<IMediator>();

        await mediator.Send(new UpdateAllMembershipStatusCommand());

      }
      catch(Exception ex)
      {
        return;
      }
    }
  }
}
