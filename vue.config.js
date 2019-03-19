// module.exports = {
//   devServer: {
//     proxy: {
//       'https://api.teleport.media/demo/peerconnectionstat': {
//         target: 'https://api.teleport.media/demo/peerconnectionstat',
//         ws: true,
//         onProxyReq: proxyReq => {
//           console.log(123123)
//           if (proxyReq.getHeader('origin')) {
//             proxyReq.setHeader('origin', 'http://localhost');
//           }
//         },
//         changeOrigin: true
//       }
//     }
//   }
// }