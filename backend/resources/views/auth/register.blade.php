<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registrazione - MealBuddy</title>
    <link rel="stylesheet" href="{{ asset('css/register.css') }}">
</head>
<body>
    <div class="container">
        <div class="card">
            <h1>Registrati Qui</h1>

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
            <form action="{{ route('register') }}" method="post" class="form">
                @csrf
                <input type="text" name="name" id="name" placeholder="Nome utente" required>
                <input type="email" name="email" id="email" placeholder="Email" required>
                <input type="password" name="password" id="password" placeholder="Password" required>
                <input type="password" name="password_confirmation" id="password_confirmation" placeholder="Conferma Password" required>

                <button type="submit">Registrati</button>
            </form>

            <div class="footer">
                <p>
                    Già registrato?
                    <a href="{{ route('login') }}">Accedi qui</a>
                </p>
            </div>
        </div>
    </div>
</body>
</html>
