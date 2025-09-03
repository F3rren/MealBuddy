<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - MealBuddy</title>
    <link rel="stylesheet" href="{{ asset('css/login.css') }}">
</head>
<body>

    <div class="container">
        <div class="card">
            {{-- Header --}}
            <div class="text-center">
                <h2>Login</h2>
                <p>Accedi al tuo account</p>
            </div>

            {{-- Errori --}}
            @if ($errors->any())
                <div class="errors">
                    <ul>
                        @foreach ($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif

            {{-- Form --}}
            <form action="{{ route('login') }}" method="post">
                @csrf

                {{-- Email --}}
                <div class="input-group">
                    <span>📧</span>
                    <input type="text" name="email" id="email" placeholder="Email">
                </div>

                {{-- Password --}}
                <div class="input-group">
                    <span>🔒</span>
                    <input type="password" name="password" id="password" placeholder="Password">
                </div>

                {{-- Remember + Forgot --}}
                <div class="forgot-password" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;text-decoration: none;">
                    <a href="{{ route('password.request') }}">Password dimenticata?</a>
                </div>

                {{-- Bottone --}}
                <button type="submit">Accedi</button>
            </form>

            {{-- Link Registrazione --}}
            <div class="register" >
                <p>Non hai un account?
                    <a href="{{ route('register') }}">Registrati qui</a>
                </p>
            </div>
        </div>
    </div>

</body>
</html>
