class Program
{
    private const string PlayerScriptUrlTemplate = "https://s.ytimg.com/yts/jsbin/html5player-{0}/html5player.js";
    private const string DecodeFunctionPatternTemplate = @"function #NAME#\([^\)]+\){.*?};";
    private const string HelperObjectPatternTemplate = @"var #NAME#={.*?};";

    private static readonly Regex SignatureRegex = new Regex(@"s=(?<Signature>[A-F0-9]+\.[A-F0-9]+)");
    private static readonly Regex PlayerVersionRegex = new Regex(@"html5player-(?<PlayerVersion>[\w\d\-]+)\\\/html5player\.js");
    private static readonly Regex DecodeFunctionNameRegex = new Regex(@"\.sig\|\|(?<FunctionName>[a-zA-Z0-9$]+)\(");
    private static readonly Regex HelperObjectNameRegex = new Regex(@";(?<ObjectName>[A-Za-z0-9]+)\.");

    static void Main()
    {
        const string videoUrl = "https://www.youtube.com/watch?v=6pIyg35wiB4";

        var client = new WebClient();
        var videoPageData = client.DownloadString(videoUrl);

        var encodedSignature = SignatureRegex.Match(videoPageData).Groups["Signature"].Value;

        var playerVersion = PlayerVersionRegex.Match(videoPageData).Groups["PlayerVersion"].Value;
        var playerScriptUrl = string.Format(PlayerScriptUrlTemplate, playerVersion);
        var playerScript = client.DownloadString(playerScriptUrl);

        var decodeFunctionName = DecodeFunctionNameRegex.Match(playerScript).Groups["FunctionName"].Value;
        var decodeFunction = Regex.Match(playerScript, DecodeFunctionPatternTemplate.Replace("#NAME#", decodeFunctionName)).Value;
        var helperObjectName = HelperObjectNameRegex.Match((decodeFunction)).Groups["ObjectName"].Value;
        var helperObject = Regex.Match(playerScript, HelperObjectPatternTemplate.Replace("#NAME#", helperObjectName)).Value;

        var engine = new ScriptEngine(ScriptEngine.JavaScriptLanguage);
        var decoderScript = engine.Parse(helperObject + decodeFunction);
        var decodedSignature = decoderScript.CallMethod(decodeFunctionName, encodedSignature).ToString();

        // Jint variant
        //var engine = new Engine();
        //var decoderScript = engine.Execute(helperObject).Execute(decodeFunction);
        //var decodedSignature = decoderScript.Invoke(decodeFunctionName, encodedSignature).ToString();

        Console.WriteLine("Encoded Signature\n{0}.\n{1}", encodedSignature.Split('.').First(), encodedSignature.Split('.').Last());
        Console.WriteLine();
        Console.WriteLine("Decoded Signature\n{0}.\n{1}", decodedSignature.Split('.').First(), decodedSignature.Split('.').Last());
        Console.ReadLine();
    }
}