workspace "Amazon Web Services Example" "An example AWS deployment architecture." {

    model {
		claire = person "Claire" "The end user of our client"
		marc = person "Marc" "Our client"

		keyban = softwareSystem "Keyban" "The server part of our product that host the wallet services" {
			!adrs ./adr
		}
    }

    views {
        systemContext keyban {
            include *
            autoLayout lr
        }
    }

}
