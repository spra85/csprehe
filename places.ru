require "json"

app = Proc.new do |env|
  path = File.expand_path(File.dirname(__FILE__)) + "/public/javascript/places.json"
  places = File.read(path)
  [
    200,
    {
      "Content-Type" => "application/json",
      "Access-Control-Allow-Origin" => "*"
    },
    [ places ]
  ]
end

run app