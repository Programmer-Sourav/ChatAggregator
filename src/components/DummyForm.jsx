export default function DummyForm(){



    return(
     
<div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-300 via-cyan-400 to-cyan-500 p-6">

  
  <div class="w-full max-w-md bg-white bg-opacity-20 backdrop-blur-md rounded-xl shadow-lg p-8">

    <h2 class="text-3xl font-bold text-white text-center mb-6">
      Sign Up
    </h2>

    <form class="space-y-5">
  
      <div>
        <label class="block text-white font-semibold mb-2" for="name">Name</label>
        <input id="name" type="text"
          class="w-full bg-transparent border border-white/70 rounded-lg py-2 px-4 text-white placeholder-white/70
                 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:border-cyan-200 transition"
          placeholder="Your Name" />
      </div>

    
      <div>
        <label class="block text-white font-semibold mb-2" for="email">Email</label>
        <input id="email" type="email"
          class="w-full bg-transparent border border-white/70 rounded-lg py-2 px-4 text-white placeholder-white/70
                 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:border-cyan-200 transition"
          placeholder="you@example.com" />
      </div>

    
      <div>
        <label class="block text-white font-semibold mb-2" for="message">Message</label>
        <textarea id="message" rows="4"
          class="w-full bg-transparent border border-white/70 rounded-lg py-2 px-4 text-white placeholder-white/70
                 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:border-cyan-200 transition"
          placeholder="Your message..."></textarea>
      </div>

   
      <button type="submit"
        class="w-full text-white font-bold py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-cyan-600
               hover:from-cyan-500 hover:to-cyan-700 focus:ring-4 focus:ring-cyan-300 transition">
        Submit
      </button>
    </form>
  </div>
</div>

    )
}