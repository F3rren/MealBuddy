@if (session('status'))
    <div class="mb-4 font-medium text-sm text-green-600">
        {{ session('status') }}
    </div>
@endif
@if ($errors->any())
    <ul>
        @foreach ($errors->all() as $error)
            <li>{{ $error }}</li>
        @endforeach
    </ul>
@endif
<form action="{{ route('password.email') }}" method="post">
    @csrf
    <input type="email" name="email" id="email">
    <button type="submit">Invia Link di Reset</button>
</form>
