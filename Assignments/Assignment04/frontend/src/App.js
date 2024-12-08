import React, { useState, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar.js";
import "bootstrap/dist/css/bootstrap.min.css"; 

// Lazy load components for better performance
const Contacts = lazy(() => import("./Contacts.js"));
const AddContact = lazy(() => import("./AddContacts.js"));
const DeleteContact = lazy(() => import("./DeleteContacts.js"));
const SearchContact = lazy(() => import("./SearchContact.js"));

function App() {
  const [contacts, setContacts] = useState([]); // Centralized state for contacts

  return (
    <Router>
      <div className="d-flex">
        {/* Sidebar for navigation */}
        <Sidebar />
        <div className="flex-grow-1 p-3">
          <h1 className="text-center mb-4">Phone Contacts App</h1>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              {/* Define application routes */}
              <Route path="/" element={<div>Welcome to the Contacts App!</div>} />
              <Route
                path="/contacts"
                element={
                  <Contacts contacts={contacts} setContacts={setContacts} />
                }
              />
              <Route
                path="/add-contact"
                element={<AddContact setContacts={setContacts} />}
              />
              <Route
                path="/delete-contact"
                element={
                  <DeleteContact contacts={contacts} setContacts={setContacts} />
                }
              />
              <Route
                path="/search-contacts"
                element={
                  <SearchContact
                    contacts={contacts}
                    setContacts={setContacts}
                  />
                }
              />
              {/* 404 Route */}
              <Route path="*" element={<div>404 - Page Not Found</div>} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </Router>
  );
}

export default App;
