import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<GoogleOAuthProvider clientId="63340242083-mbo298iksej579e2ni9gaarbkfbcbj78.apps.googleusercontent.com">
			<App />
		</GoogleOAuthProvider>
	</StrictMode>,
);
