## setup
config.define_string("clk-k8s-local-path")
cfg = config.parse()

v1alpha1.extension_repo(
    name='clk-k8s',
    url=cfg.get(
        'clk-k8s-local-path',
        'https://github.com/clk-project/clk_extension_k8s',
    ),
)
v1alpha1.extension(
    name='clk-helpers',
    repo_name='clk-k8s',
    repo_path='tilt-extensions/helpers',
)

load('ext://clk-helpers', 'earthly_build', 'add_domain')

## building custom images

earthly_build(
    "keyban.io/docusaurus",
    "./docs/docusaurus+live",
    deps=["./docs/docusaurus"],
    live_update=[
        fall_back_on('./docs/docusaurus/Earthfile'),
        sync('docs/docusaurus/', '/app/'),
    ],
)

earthly_build(
    "keyban.io/nest-api",
    "./backend/nestjs+live",
    deps=["./backend/nestjs"],
    live_update=[
        fall_back_on('./backend/nestjs/Earthfile'),
        sync('backend/nestjs/src', '/app/'),
    ],
)

earthly_build(
    "keyban.io/signer-eddsa",
    "./signers/eddsa/server+live",
    deps=["./signers/eddsa/server"],
    live_update=[
        fall_back_on('./signers/eddsa/server/Earthfile'),
        sync('./signers/eddsa/server/src', '/app/'),
    ],
)

k8s_yaml(helm("./helm/dap", name="dap"))

k8s_resource(
    objects=['allow-ingress-access:networkpolicy', 'dap-doc:Ingress:default', 'dap-nest:Ingress:default', 'control-pod-communication:networkpolicy'],
    new_name='ingress'
  )
#### opening some ports to ease development

k8s_resource('dap-doc', port_forwards=['8080:80'])
k8s_resource('dap-nest', port_forwards=['3000:3000'])
k8s_resource('dap-signer-eddsa', port_forwards=['9000:9000'])

## making sure the pods in the cluster can get access to the publicly exposed
## services via the ingress

add_domain('keyban.localtest.me')
