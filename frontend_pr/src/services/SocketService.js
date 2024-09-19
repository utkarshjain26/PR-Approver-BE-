// // socketManager.js
// import io from 'socket.io-client';
// let socket;

// export const connectSocket = (token) => {
//   socket = io('http://localhost:4000', {
//     query: { token }
//   });
//   if(socket) console.log('Connected from server via socket');
// }

// export const disconnectSocket = () => {
//   if (socket) {
//     socket.disconnect();
//     console.log('Socket has been disconnected on logout');
//   }
// }

// export const getSocket = () => {
//   if(socket) return socket.id;
// };

// export default { connectSocket, disconnectSocket, getSocket };
