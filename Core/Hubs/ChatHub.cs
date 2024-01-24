using Microsoft.AspNetCore.SignalR;

namespace Core.Hubs
{
	public class ChatHub : Hub
    {
        public async Task SendMessage(string senderId, string message, string receiverId, string date, string currentUserId)
        {
            await Clients.All.SendAsync("ReceiveMessages", senderId, message, receiverId, date, currentUserId);
        } 
    }
}
