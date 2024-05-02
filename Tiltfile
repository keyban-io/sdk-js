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

load('ext://clk-helpers', 'earthly_build')

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
k8s_yaml(helm("./helm/dap", name="dap"))

k8s_resource('dap-doc', port_forwards=['8080:80'])
k8s_resource('dap-nest', port_forwards=['3000:3000'])
