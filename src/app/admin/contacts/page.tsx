"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ContactService } from "@/lib/firebase/contentServices";
import { Contact } from "@/lib/firebase/contentTypes";
import { toast } from "react-hot-toast";
import { getAllDocuments, COLLECTIONS } from "@/lib/firebase/firestoreUtils";

export default function ContactsAdmin() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [error, setError] = useState<string | null>(null);

  // Fetch contacts
  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);
      try {
        const data = await getAllDocuments<Contact>(COLLECTIONS.CONTACTS);
        if (data.length > 0) {
          // Sort by date (newest first)
          const sortedData = data.sort((a, b) => {
            return (new Date(b.date).getTime()) - (new Date(a.date).getTime());
          });
          setContacts(sortedData);
        } else {
          setContacts([]);
        }
      } catch (error) {
        setError("Failed to load contacts. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchContacts();
  }, []);

  // Update contact status
  const updateStatus = async (id: string, newStatus: 'new' | 'read' | 'replied' | 'archived') => {
    if (!id) return;
    
    try {
      const contactToUpdate = contacts.find(contact => contact.id === id);
      if (!contactToUpdate) return;
      
      const updatedContact = { ...contactToUpdate, status: newStatus };
      await ContactService.update(id, updatedContact);
      
      // Update state
      setContacts(prev => 
        prev.map(contact => 
          contact.id === id ? updatedContact : contact
        )
      );
      
      toast.success(`Message marked as ${newStatus}`);
    } catch (error) {
      console.error("Error updating contact status:", error);
      toast.error("Failed to update message status");
    }
  };

  // Delete contact
  const deleteContact = async (id: string) => {
    if (!id) return;
    
    if (confirm("Are you sure you want to delete this contact message?")) {
      try {
        await ContactService.delete(id);
        setContacts(prev => prev.filter(contact => contact.id !== id));
        setSelectedContact(null);
        toast.success("Message deleted");
      } catch (error) {
        console.error("Error deleting contact:", error);
        toast.error("Failed to delete message");
      }
    }
  };

  // Update notes
  const updateNotes = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedContact) return;
    
    setSaving(true);
    try {
      await ContactService.update(selectedContact.id as string, selectedContact);
      setContacts(prev => 
        prev.map(contact => 
          contact.id === selectedContact.id ? selectedContact : contact
        )
      );
      toast.success("Notes updated");
    } catch (error) {
      console.error("Error updating notes:", error);
      toast.error("Failed to update notes");
    } finally {
      setSaving(false);
    }
  };

  // Filter contacts
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = 
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.message.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter === 'all' || contact.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'read':
        return 'bg-green-100 text-green-800';
      case 'replied':
        return 'bg-purple-100 text-purple-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-8 min-h-screen bg-[var(--card-bg)] text-[var(--text-color)]">
      <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            <span className="text-gradient">Contact Messages</span>
          </h1>
          <p className="text-sm opacity-70 mt-1">Manage contact form submissions</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link 
            href="/admin"
            className="px-4 py-2 rounded-md border border-[var(--border-color)] hover:bg-[var(--card-bg-hover)] transition-all"
          >
            Back to Dashboard
          </Link>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact List */}
        <div className="lg:col-span-2">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-[var(--card-bg)] p-6 rounded-lg shadow-sm border border-[var(--border-color)] glass-effect"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
              <h2 className="text-xl font-bold">Messages</h2>
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-4 py-2 rounded-md bg-[var(--background)] border border-[var(--border-color)] focus:border-[var(--primary-gradient-from)] focus:ring-1 focus:ring-[var(--primary-gradient-from)] transition-all admin-input"
                />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 rounded-md bg-[var(--background)] border border-[var(--border-color)] focus:border-[var(--primary-gradient-from)] focus:ring-1 focus:ring-[var(--primary-gradient-from)] transition-all admin-input"
                >
                  <option value="all">All Status</option>
                  <option value="new">New</option>
                  <option value="read">Read</option>
                  <option value="replied">Replied</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>
            
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="admin-spinner"></div>
              </div>
            ) : contacts.length === 0 ? (
              <div className="text-center py-12">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-[var(--border-color)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <h3 className="mt-2 text-lg font-medium">No messages yet</h3>
                <p className="mt-1 text-[var(--foreground)]/70">
                  Messages from your contact form will appear here.
                </p>
              </div>
            ) : filteredContacts.length === 0 ? (
              <div className="text-center py-12">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-[var(--border-color)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h3 className="mt-2 text-lg font-medium">No matching messages</h3>
                <p className="mt-1 text-[var(--foreground)]/70">
                  Try adjusting your search or filter.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredContacts.map((contact) => (
                  <motion.div 
                    key={contact.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`bg-[var(--background)] p-4 rounded-lg relative border border-[var(--border-color)] hover:border-[var(--border-color-hover)] transition-all ${selectedContact?.id === contact.id ? 'ring-2 ring-[var(--primary-gradient-from)]' : ''}`}
                    onClick={() => setSelectedContact(contact)}
                  >
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-semibold">{contact.name}</h3>
                        <p className="text-sm text-[var(--foreground)]/70">{contact.email}</p>
                      </div>
                      <div>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs ${getStatusColor(contact.status)}`}>
                          {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    <p className="mt-2 text-sm line-clamp-2">{contact.message}</p>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-xs text-[var(--foreground)]/50">
                        {new Date(contact.date).toLocaleDateString()}
                      </span>
                      <div className="flex gap-2">
                        {contact.status !== 'read' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              updateStatus(contact.id as string, 'read');
                            }}
                            className="text-xs px-2 py-1 rounded bg-[var(--card-bg)] hover:bg-[var(--card-bg-hover)] transition-all"
                          >
                            Mark Read
                          </button>
                        )}
                        {contact.status !== 'replied' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              updateStatus(contact.id as string, 'replied');
                            }}
                            className="text-xs px-2 py-1 rounded bg-[var(--card-bg)] hover:bg-[var(--card-bg-hover)] transition-all"
                          >
                            Mark Replied
                          </button>
                        )}
                        {contact.status !== 'archived' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              updateStatus(contact.id as string, 'archived');
                            }}
                            className="text-xs px-2 py-1 rounded bg-[var(--card-bg)] hover:bg-[var(--card-bg-hover)] transition-all"
                          >
                            Archive
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-1">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-[var(--card-bg)] p-6 rounded-lg shadow-sm border border-[var(--border-color)] glass-effect sticky top-8"
          >
            {selectedContact ? (
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-bold">Message Details</h2>
                  <div className="flex gap-2">
                    <button
                      onClick={() => deleteContact(selectedContact.id as string)}
                      className="p-1.5 rounded text-red-500 hover:bg-red-500/10 transition-all"
                      title="Delete Message"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-semibold">{selectedContact.name}</h3>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs ${getStatusColor(selectedContact.status)}`}>
                      {selectedContact.status.charAt(0).toUpperCase() + selectedContact.status.slice(1)}
                    </span>
                  </div>
                  
                  <div>
                    <p className="text-sm text-[var(--foreground)]/70">Email:</p>
                    <p className="text-sm">{selectedContact.email}</p>
                  </div>
                  
                  {selectedContact.phone && (
                    <div>
                      <p className="text-sm text-[var(--foreground)]/70">Phone:</p>
                      <p className="text-sm">{selectedContact.phone}</p>
                    </div>
                  )}
                  
                  {selectedContact.subject && (
                    <div>
                      <p className="text-sm text-[var(--foreground)]/70">Subject:</p>
                      <p className="text-sm">{selectedContact.subject}</p>
                    </div>
                  )}
                  
                  <div>
                    <p className="text-sm text-[var(--foreground)]/70">Date:</p>
                    <p className="text-sm">{new Date(selectedContact.date).toLocaleString()}</p>
                  </div>
                  
                  <div className="pt-4 border-t border-[var(--border-color)]">
                    <p className="text-sm text-[var(--foreground)]/70 mb-2">Message:</p>
                    <p className="text-sm p-3 bg-[var(--background)] rounded-md border border-[var(--border-color)] whitespace-pre-wrap">
                      {selectedContact.message}
                    </p>
                  </div>
                  
                  <form onSubmit={updateNotes} className="pt-4 border-t border-[var(--border-color)]">
                    <label className="block text-sm text-[var(--foreground)]/70 mb-2">Notes:</label>
                    <textarea
                      value={selectedContact.notes || ''}
                      onChange={(e) => setSelectedContact({...selectedContact, notes: e.target.value})}
                      className="w-full px-4 py-2 rounded-md bg-[var(--background)] border border-[var(--border-color)] focus:border-[var(--primary-gradient-from)] focus:ring-1 focus:ring-[var(--primary-gradient-from)] transition-all admin-input min-h-[100px]"
                      placeholder="Add your notes here..."
                    ></textarea>
                    
                    <div className="mt-4 flex justify-end">
                      <button
                        type="submit"
                        disabled={saving}
                        className="px-4 py-2 rounded-md bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)] text-white hover:opacity-90 transition-all flex items-center gap-2"
                      >
                        {saving ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                            Saving...
                          </>
                        ) : (
                          'Save Notes'
                        )}
                      </button>
                    </div>
                  </form>
                  
                  <div className="pt-4 border-t border-[var(--border-color)]">
                    <p className="text-sm text-[var(--foreground)]/70 mb-2">Actions:</p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => updateStatus(selectedContact.id as string, 'new')}
                        className={`px-3 py-1 rounded text-sm transition-all ${selectedContact.status === 'new' ? 'bg-blue-500 text-white' : 'bg-[var(--background)] hover:bg-[var(--card-bg-hover)]'}`}
                      >
                        Mark as New
                      </button>
                      <button
                        onClick={() => updateStatus(selectedContact.id as string, 'read')}
                        className={`px-3 py-1 rounded text-sm transition-all ${selectedContact.status === 'read' ? 'bg-green-500 text-white' : 'bg-[var(--background)] hover:bg-[var(--card-bg-hover)]'}`}
                      >
                        Mark as Read
                      </button>
                      <button
                        onClick={() => updateStatus(selectedContact.id as string, 'replied')}
                        className={`px-3 py-1 rounded text-sm transition-all ${selectedContact.status === 'replied' ? 'bg-purple-500 text-white' : 'bg-[var(--background)] hover:bg-[var(--card-bg-hover)]'}`}
                      >
                        Mark as Replied
                      </button>
                      <button
                        onClick={() => updateStatus(selectedContact.id as string, 'archived')}
                        className={`px-3 py-1 rounded text-sm transition-all ${selectedContact.status === 'archived' ? 'bg-gray-500 text-white' : 'bg-[var(--background)] hover:bg-[var(--card-bg-hover)]'}`}
                      >
                        Archive
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-[var(--border-color)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <h3 className="mt-2 text-lg font-medium">Select a message</h3>
                <p className="mt-1 text-[var(--foreground)]/70">
                  Click on a message from the list to view details
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
} 