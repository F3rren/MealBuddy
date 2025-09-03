<h2>Inserisci codice 2FA</h2>

<form action="{{ route('two-factor.login') }}" method="post">
    @csrf
    <input type="text" name="code" id="code">
    <button type="submit">Invia Codice</button>
</form>

<form action="{{ route('two-factor.login') }}" method="post">
    @csrf
    <input type="text" name="recovery_code" id="recovery_code">
    <button type="submit">Invia Codice di Recupero</button>
</form>