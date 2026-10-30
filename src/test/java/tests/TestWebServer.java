package tests;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class TestWebServer {
    private static HttpServer server;

    public static void start() throws IOException {
        if (server != null) {
            return;
        }

        server = HttpServer.create(new InetSocketAddress(3001), 0);
        Path root = Paths.get("src/test/resources/site").toAbsolutePath().normalize();

        server.createContext("/", new StaticFileHandler(root));
        server.start();
    }

    public static void stop() {
        if (server != null) {
            server.stop(0);
            server = null;
        }
    }

    private static class StaticFileHandler implements HttpHandler {
        private final Path root;

        private StaticFileHandler(Path root) {
            this.root = root;
        }

        @Override
        public void handle(HttpExchange exchange) throws IOException {
            String requestPath = exchange.getRequestURI().getPath();
            if (requestPath == null || requestPath.isBlank()) {
                requestPath = "/";
            }
            if (requestPath.equals("/")) {
                requestPath = "/index.html";
            }

            Path filePath = root.resolve(requestPath.substring(1)).normalize();
            if (!filePath.startsWith(root)) {
                exchange.sendResponseHeaders(403, -1);
                return;
            }

            if (Files.notExists(filePath)) {
                exchange.sendResponseHeaders(404, -1);
                return;
            }

            byte[] content = Files.readAllBytes(filePath);
            exchange.getResponseHeaders().add("Content-Type", mimeTypeFor(filePath));
            exchange.sendResponseHeaders(200, content.length);
            try (OutputStream outputStream = exchange.getResponseBody()) {
                outputStream.write(content);
            }
        }

        private String mimeTypeFor(Path filePath) {
            String fileName = filePath.getFileName().toString().toLowerCase();
            if (fileName.endsWith(".html")) return "text/html";
            if (fileName.endsWith(".css")) return "text/css";
            if (fileName.endsWith(".js")) return "application/javascript";
            if (fileName.endsWith(".png")) return "image/png";
            return "application/octet-stream";
        }
    }
}
