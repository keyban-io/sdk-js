def earthly_build(image, target, args=None, **kwargs):
    args = args or []
    args.append("--ref=$EXPECTED_REF")
    custom_build(image,
                 "earthly --push " + target + " " + " ".join(args),
                 skips_local_docker=True,
                 disable_push=True,
                 **kwargs)


earthly_build("keyban.io/docusaurus",
              "./docs/docusaurus+live",
              deps=["./docs/docusaurus/"])
k8s_yaml(helm("./helm/dap", name="dap"))

k8s_resource('dap-doc', port_forwards=['8080:80'])
