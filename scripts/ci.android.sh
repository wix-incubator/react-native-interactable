yes | $ANDROID_HOME/tools/bin/sdkmanager --licenses

npm install
npm run e2e:android:ci
