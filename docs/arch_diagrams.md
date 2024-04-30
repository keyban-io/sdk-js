In here, we try to follow the [C4 model](https://c4model.com/) way of describing our product.

Those diagram are meant to show our stack and should be editing to reflect it at
any time.

[Container Diagram](https://c4model.com/#ContainerDiagram)
=================
```mermaid
 C4Container
    title Container Diagram of the keyban wallet
    Container(doc, "Documentation")
    Container(backend, "Backend", "Most likely written in nestjs")

    Container_Boundary(gandhi_system, "Gandhi's stack") {
      Container_Ext(app, "Gandhi's application", "the application that will make use of our react-* wallet")
    }

    Rel(app, backend, "")
```

[Dynamic diagram](https://c4model.com/#DynamicDiagram)
===============

```mermaid
C4Dynamic
    title Hello world

    Container(backend, "Backend", "Most likely written in nestjs")
    Container_Ext(app, "Gandhi's application", "the application that will make use of our react-* wallet")

    BiRel(app, backend, "hello world!", "HTTP")
```

[Deployment diagram](https://c4model.com/#DeploymentDiagram) in our local machines
====

```mermaid
flowchart RL
 subgraph subgraph_r4ph9je5f["K8s"]
        node_pljs0vkux["Pods"]
  end
 subgraph node_pljs0vkux["Pods"]
        container["container"]
  end
 subgraph subgraph_je1ctib1b["registry"]
        node_ctz5mk14o["docker images"]
  end
 subgraph subgraph_jxfr0hxtf["Docker"]
        subgraph_je1ctib1b
        subgraph_r4ph9je5f
  end
 subgraph subgraph_2w31i6cj3["K8s chez google (gke)"]
        node_tqx15dw25["Pods"]
        service["service"]
        deployment["deployment"]
  end
    kind["kind"] --> subgraph_jxfr0hxtf
    kubectl["kubectl"] --> node_pljs0vkux
    n1["lens"] --> node_pljs0vkux
    helm["helm"] --> subgraph_r4ph9je5f
    earthly["earthly"] --> node_ctz5mk14o & n5["Artifacts (.zip, .exe...)"]
    tilt["tilt"] --> helm & earthly & subgraph_r4ph9je5f
    container --> ns["docker hub"] & subgraph_je1ctib1b
```
