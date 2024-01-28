import Logger from './services/logger';
import Config from './config';
import HTTPServer from './services/server';
import minimist from 'minimist';
import cluster from 'cluster';
import os from 'os';
import initWsServer from './services/socket';

const argumentos = minimist(process.argv.slice(2));
const clusterMode = argumentos.cluster;
const numCPUs = os.cpus().length;

const init = async () => {
  initWsServer(HTTPServer);

  if (clusterMode && cluster.isPrimary) {
    Logger.info('Iniciando modo cluster');
    Logger.info(`PID Master ${process.pid}`);

    for (let i = 0; i < numCPUs; i++) {
      cluster.fork()
    };

    cluster.on('exit', (worker: any) => {
      Logger.info(`Worker ${worker.process.pid} muerto: ${Date()}`);
      cluster.fork()
    });
  } else {
    HTTPServer.listen(Config.PORT, () => {
      Logger.info(`Servidor escuchando en puerto ${Config.PORT}`);
    });
  };

  HTTPServer.on('error', (error) => {
    Logger.error(`Error en el servidor: ${error}`);
  });
};

init();



