<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Laravel Fortify</title>
</head>
<body>
    <h1>Area Riservata</h1>
    <hr>
    Benvenuto, {{ Auth::user()->name }}
    <form action="{{ route('logout') }}" method="post">
        @csrf
        <hr>
        <button type="submit">Logout</button>
    </form>

    <h2>Modifica informazioni di base</h2>
    <form action="{{ route('user-profile-information.update') }}" method="post">
        @csrf
        @method('PUT')
        <input type="text" name="name" id="name" value="{{ auth()->user()->name }}">
        {{ $errors->updateProfileInformation->first('name') ?? ''}}

        <input type="email" name="email" id="email" value="{{ auth()->user()->email }}">
        {{ $errors->updateProfileInformation->first('email') ?? ''}}

        <button type="submit">Aggiorna dati</button>
    </form>

    <hr>

    <h2>Aggiornamento Password</h2>

    <form action="{{ route('user-password.update') }}" method="post">
        @csrf
        @method('PUT')
        <input type="text" name="current_password" id="current_password">
        {{ $errors->updatePassword->first('current_password') ?? ''}}

        <input type="text" name="password" id="password">
        {{ $errors->updatePassword->first('password') ?? ''}}

        <input type="text" name="password_confirmation" id="password_confirmation">
        {{ $errors->updatePassword->first('password_confirmation') ?? ''}}
        <button type="submit">Aggiorna password</button> 
    </form>

    <h2>Autenticazione a due Fattori</h2>
    @if (auth()->user()->two_factor_secret)
        @if (Laravel\Fortify\Features::optionEnabled(Laravel\Fortify\Features::twoFactorAuthentication(), 'confirm'))
            <span>Completata l'abilitazione della Autenticazione a due Fattori</span>
        @else
            <span>Autenticazione a due Fattori Abilitata</span>
        @endif
    @else
        <span>Autenticazione a due Fattori Disabilitata</span>
    @endif

    @if (auth()->user()->two_factor_secret)
        @if (!Laravel\Fortify\Features::optionEnabled(Laravel\Fortify\Features::twoFactorAuthentication(), 'confirm') || auth()->user()->two_factor_confirmed_at)
            <div>
                @foreach (json_decode(decrypt(auth()->user()->two_factor_recovery_codes), true) as $code)
                    <div>{{ $code }}</div>
                @endforeach
            </div>
        @else
            @if (!auth()->user()->two_factor_confirmed_at)
                <div>
                    {!! auth()->user()->twoFactorQrCodeSvg() !!}
                </div>

               <form action="{{ route('two-factor.confirm') }}" method="post">
                    @csrf
                    <input type="text" name="code" id="code">
                    <button type="submit">Conferma</button>
               </form> 
            @endif
        @endif

        <form action="{{ route('two-factor.disable') }}" method="post">
            @csrf
            @method('DELETE')
            <button type="submit">Disabilita 2FA</button>
        </form>
    @else
        <form action="{{ route('two-factor.enable') }}" method="post">
            @csrf
            <button type="submit">Abilita 2FA</button>
        </form>
    @endif

</body>
</html>
