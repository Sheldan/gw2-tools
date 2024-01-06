allow_k8s_contexts('k8s-cluster')

load('ext://restart_process', 'docker_build_with_restart')
registry = 'harbor.sheldan.dev/gw2/'

local_resource(
  'java-backend-compile',
  ' cd gw2-tools-backend && mvn install && ' +
  ' rm -rf executable/target/jar-staging && ' +
  ' unzip -o executable/target/gw2-tools-exec.jar -d executable/target/jar-staging && ' +
  ' rsync --delete --delete-excluded --inplace --checksum --exclude="*-SNAPSHOT.jar" -r executable/target/jar-staging/ executable/target/jar && ' +
  ' rm -rf executable/target/jar/snapshots && ' +
  ' mkdir executable/target/jar/snapshots && ' +
  ' rsync --delete --delete-excluded --inplace --checksum --include="*/" --include="*-SNAPSHOT.jar" --exclude="*" -r executable/target/jar-staging/BOOT-INF/lib/ executable/target/jar/snapshots',
  deps=['gw2-tools-backend/pom.xml'], auto_init=False, trigger_mode = TRIGGER_MODE_MANUAL, labels=['compilation'])

docker_build_with_restart(
  registry + 'gw2-tools-backend',
  './gw2-tools-backend/executable/target/jar',
  entrypoint=['java', '-noverify', '-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005', '-cp', '.:./lib/*', 'dev.sheldan.gw2.tools.ToolApplicationKt'],
  dockerfile='./gw2-tools-backend/executable/Dockerfile',
  live_update=[
    sync('./gw2-tools-backend/executable/target/jar/BOOT-INF/lib', '/app/lib'),
    sync('./gw2-tools-backend/executable/target/jar/META-INF', '/app/META-INF'),
    sync('./gw2-tools-backend/executable/target/jar/BOOT-INF/classes', '/app'),
    sync('./gw2-tools-backend/executable/target/jar/snapshots', '/app/lib')
  ],
)

docker_build(registry + 'gw2-tools-frontend', 'gw2-tools-frontend', dockerfile='gw2-tools-frontend/docker/Dockerfile')
docker_build(registry + 'gw2-tools-database', 'gw2-tools-backend/database/src/main', dockerfile='gw2-tools-backend/database/src/main/docker/Dockerfile')

local('cd tilt/gw2-tools-dev && helm dep up')
k8s_yaml(helm('tilt/gw2-tools-dev', values=[
'./../drr-environments/argocd/apps/gw2-tools/values/local/values.yaml',
'./../drr-environments/argocd/apps/gw2-tools/values/local/values.secrets.yaml'
]))

k8s_resource('backend', port_forwards='5005:5005', labels=['applications'])
k8s_resource('frontend', labels=['applications'])
k8s_resource('chart-postgresql', port_forwards='5432:5432', labels=['applications'])
k8s_resource('db-config-deployment-job', auto_init=False, trigger_mode = TRIGGER_MODE_MANUAL, labels=['deployment'])

local_resource('ui-build', 'rm -rf gw2-tools-frontend/resources/static && cd gw2-tools-ui && npm run build && cp -R build/* ../gw2-tools-frontend/resources', auto_init=False, trigger_mode = TRIGGER_MODE_MANUAL, labels=['compilation'])