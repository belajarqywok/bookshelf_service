migrate :
	prisma migrate dev --name init

pm2_apply :
	pm2 start pm2.ecosystem.config.js
	pm2 save

pm2_start :
	pm2 start all

pm2_stop :
	pm2 stop all

pm2_delete :
	pm2 delete all

pm2_redis:
	pm2 start ./process/redis_process.js --name redis_process
