import { GoogleLogin } from "@react-oauth/google";

export default function googleSignIn() {
	return (
		<GoogleLogin
			onSuccess={async (credentialResponse) => {
				console.log(credentialResponse.credential); // JWT here

				await fetch("http://localhost:3000/auth/google", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					credentials: "include",
					body: JSON.stringify({
						credential: credentialResponse.credential,
					}),
				});
			}}
			onError={() => {
				console.log("Login Failed");
			}}
		/>
	);
}
