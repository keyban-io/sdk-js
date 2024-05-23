# Define a target to run yarn install
install:
	yarn install

# Define a target to enter the ios folder and run bundle install and pod install
install_ios:
	cd ios && bundle install && pod install && cd ..

# Define a target to link the packages using yalc
link_packages:
	yalc link @keyban/sdk-base
	yalc link @keyban/sdk-react-native

# Define a target to run all the above targets in sequence
prepare: install install_ios link_packages

run-ios: ios

run-android: android

