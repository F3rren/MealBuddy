<h1>Reset Password</h1>
@if ($errors->any())
    <ul>
        @foreach ($errors->all() as $error)
            <li>{{ $error }}</li>
        @endforeach
    </ul>
@endif
@if (session('status'))
    <div>
        {{ session('status') }}
    </div>
@endif
<form action="{{ route('password.update') }}" method="post">
    @csrf

    <input type="hidden" name="token" id="token" value="{{ $request->token }}">
    <input type="hidden" name="email" id="email" value="{{ $request->email }}">

    <input type="password" name="password" id="password">
    <input type="password" name="password_confirmation" id="password_confirmation">

    <button type="submit">Reset password</button>
</form>