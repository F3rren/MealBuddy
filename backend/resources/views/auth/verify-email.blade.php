@if (session('status') == 'verification-link-sent')
    <div class="mb-4 font-medium text-sm text-green-600">
        A new email verification link has been emailed to you!
    </div>
@endif

<form action="{{ route('verification.send') }}" method="post">
    @csrf
    <button type="submit">Reinvia email</button>
    <hr>
    <form action="{{ route('logout') }}" method="post">
        @csrf
        <button type="submit">Logout</button>
    </form>
</form>