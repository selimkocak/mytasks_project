// src/components/UserSettings.js
import React, { useState } from 'react';

function UserSettings({ user }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const handleSave = (e) => {
    e.preventDefault();
    // Burada kullanıcının ayarlarının güncellenmesi gerçekleştirilir
    console.log(name, email);
  };

  return (
    <div>
      <h2>User Settings</h2>
      <form onSubmit={handleSave}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default UserSettings;
