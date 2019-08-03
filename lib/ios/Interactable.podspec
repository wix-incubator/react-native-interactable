Pod::Spec.new do |s|
s.name = "Interactable"
s.version = "1.0.0"
s.summary = "Interactable"
s.description = "Interactable"
s.homepage = "https://github.com/wix/react-native-interactable"
s.license = "MIT"
s.author = { "author" => "author@domain.com" }
s.platform = :ios, "7.0"
s.source = { :git => "https://github.com/wix/react-native-interactable.git", :tag => "master" }
s.source_files = "Interactable/**/*.{h,m}"
s.requires_arc = true
s.dependency "React"
end