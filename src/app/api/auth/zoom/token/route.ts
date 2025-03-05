import {NextRequest, NextResponse} from "next/server";
import axios from "axios";

const clientId = 'il8CP_STpq95fwAnSADDw';
const clientSecret = 'H6JFgZ12jJoQWJdx9HR3UxdTAAkzpQyJ';
const redirectUri = 'http://localhost:3000/auth/zoom/callback';

export async function POST(req: NextRequest) {
  try {
    const {code} = await req.json();

    const { data } = await axios.post('https://zoom.us/oauth/token', null, {
      params: {
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
      },
      auth: {
        username: clientId!,
        password: clientSecret!,
      },
    });

    return NextResponse.json(data, {status: 200});
  } catch (error) {
    return NextResponse.json({
      message: "failed",
      error
    }, {status: 500});
  }
}