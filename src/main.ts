interface Note {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

class NotesApp {
    private notes: Note[] = [];
    private currentNote: Note | null = null;
    private currentView: 'list' | 'grid' = 'list';
    private sidebarVisible: boolean = true;

    constructor() {
        this.loadNotes();
        this.setupEventListeners();
        this.renderNotesList();
        this.updateView();
    }

    private setupEventListeners(): void {
        document.getElementById('newNote')?.addEventListener('click', () => this.createNewNote());
        document.getElementById('toggleSidebar')?.addEventListener('click', () => this.toggleSidebar());
        document.getElementById('listView')?.addEventListener('click', () => this.setView('list'));
        document.getElementById('gridView')?.addEventListener('click', () => this.setView('grid'));
        document.getElementById('deleteBtn')?.addEventListener('click', () => this.deleteCurrentNote());
        document.getElementById('searchBtn')?.addEventListener('click', () => this.toggleSearch());
    }




    private loadNotes(): void {
        const saved = localStorage.getItem('notes-app-data');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                this.notes = data.map((note: any) => ({
                    ...note,
                    createdAt: new Date(note.createdAt),
                    updatedAt: new Date(note.updatedAt)
                }));
            } catch (e) {
                this.notes = [];
            }
        }

        if (this.notes.length === 0) {
            this.createWelcomeNote();
        }
    }

    private saveNotes(): void {
        localStorage.setItem('notes-app-data', JSON.stringify(this.notes));
    }

    private createWelcomeNote(): void {
        const welcomeNote: Note = {
            id: this.generateId(),
            title: 'Welcome to Notes',
            content: `Welcome to your new notes app! Here are some features:

- Create, edit, and organize your notes
- Switch between list and grid views
- Search through your notes
- All data is saved locally in your browser

Start by clicking the "New" button to create your first note, or edit this welcome message.

Happy note-taking! 📝`,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        this.notes.push(welcomeNote);
        this.saveNotes();
    }

    private generateId(): string {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    private createNewNote(): void {
        const newNote: Note = {
            id: this.generateId(),
            title: 'Untitled',
            content: '',
            createdAt: new Date(),
            updatedAt: new Date()
        };

        this.notes.unshift(newNote);
        this.saveNotes();
        this.renderNotesList();
        this.selectNote(newNote);
        this.setView('list');
    }

    private selectNote(note: Note): void {
        if (this.currentNote) {
            this.saveCurrentNote();
        }

        this.currentNote = note;
        this.renderEditor();
        this.updateNotesList();
    }

    private renderEditor(): void {
        const container = document.getElementById('editorContainer')!;
        const emptyState = document.getElementById('emptyState')!;


        if (!this.currentNote) {
            emptyState.style.display = 'flex';
            return;
        }

        emptyState.style.display = 'none';

        let editor = container.querySelector('.editor-content') as HTMLElement;
        if (!editor) {
            editor = document.createElement('div');
            editor.className = 'editor-content';
            editor.innerHTML = `
                <div class="editor-header">
                    <input type="text" class="note-title-input" placeholder="Note title..." />
                </div>
                <textarea class="editor" placeholder="Start writing..."></textarea>
            `;
            container.appendChild(editor);
        }

        const titleInput = editor.querySelector('.note-title-input') as HTMLInputElement;
        const contentTextarea = editor.querySelector('.editor') as HTMLTextAreaElement;

        titleInput.value = this.currentNote.title;
        contentTextarea.value = this.currentNote.content;

        titleInput.oninput = () => {
            if (this.currentNote) {
                this.currentNote.title = titleInput.value || 'Untitled';
                this.currentNote.updatedAt = new Date();
                this.updateNotesList();
            }
        };

        contentTextarea.oninput = () => {
            if (this.currentNote) {
                this.currentNote.content = contentTextarea.value;
                this.currentNote.updatedAt = new Date();
                this.updateNotesList();
            }
        };

        // Auto-focus title if it's "Untitled"
        if (this.currentNote.title === 'Untitled') {
            titleInput.focus();
        }
    }

    private saveCurrentNote(): void {
        if (this.currentNote) {
            this.saveNotes();
        }
    }

    private renderNotesList(): void {
        const notesList = document.getElementById('notesList')!;
        
        if (this.notes.length === 0) {
            notesList.innerHTML = '<div class="empty-state">No notes yet</div>';
            return;
        }

        notesList.innerHTML = this.notes.map(note => `
            <div class="note-item ${note === this.currentNote ? 'active' : ''}" data-id="${note.id}">
                <div class="note-title">${this.escapeHtml(note.title)}</div>
                <div class="note-preview">${this.escapeHtml(note.content.substring(0, 100))}</div>
                <div class="note-date">${this.formatDate(note.updatedAt)}</div>
            </div>
        `).join('');

        // Add click listeners
        notesList.querySelectorAll('.note-item').forEach(item => {
            item.addEventListener('click', () => {
                const id = (item as HTMLElement).dataset.id!;
                const note = this.notes.find(n => n.id === id);
                if (note) this.selectNote(note);
            });
        });
    }

    private renderGridView(): void {
        const gridContainer = document.getElementById('gridContainer')!;
        
        if (this.notes.length === 0) {
            gridContainer.innerHTML = '<div class="empty-state">No notes yet</div>';
            return;
        }

        gridContainer.innerHTML = this.notes.map(note => `
            <div class="card-note" data-id="${note.id}">
                <div class="card-title">${this.escapeHtml(note.title)}</div>
                <div class="card-content">${this.escapeHtml(note.content)}</div>
                <div class="card-date">${this.formatDate(note.updatedAt)}</div>
            </div>
        `).join('');

        // Add click listeners
        gridContainer.querySelectorAll('.card-note').forEach(card => {
            card.addEventListener('click', () => {
                const id = (card as HTMLElement).dataset.id!;
                const note = this.notes.find(n => n.id === id);
                if (note) {
                    this.selectNote(note);
                    this.setView('list');
                }
            });
        });
    }

    private updateNotesList(): void {
        if (this.currentView === 'list') {
            this.renderNotesList();
        } else {
            this.renderGridView();
        }
    }

    private setView(view: 'list' | 'grid'): void {
        this.currentView = view;
        
        // Update button states
        document.getElementById('listView')?.classList.toggle('active', view === 'list');
        document.getElementById('gridView')?.classList.toggle('active', view === 'grid');
        
        this.updateView();
    }

    private updateView(): void {
        const editorContainer = document.getElementById('editorContainer')!;
        const gridContainer = document.getElementById('gridContainer')!;
        const sidebar = document.getElementById('sidebar')!;

        if (this.currentView === 'list') {
            editorContainer.style.display = 'flex';
            gridContainer.style.display = 'none';
            sidebar.style.display = this.sidebarVisible ? 'flex' : 'none';
            this.renderNotesList();
        } else {
            editorContainer.style.display = 'none';
            gridContainer.style.display = 'block';
            sidebar.style.display = 'none';
            this.renderGridView();
        }
    }

    private toggleSidebar(): void {
        if (this.currentView === 'grid') return;
        
        this.sidebarVisible = !this.sidebarVisible;
        const sidebar = document.getElementById('sidebar')!;
        sidebar.style.display = this.sidebarVisible ? 'flex' : 'none';
    }

    private deleteCurrentNote(): void {
        if (!this.currentNote) return;

        if (confirm('Are you sure you want to delete this note?')) {
            this.notes = this.notes.filter(note => note.id !== this.currentNote!.id);
            this.currentNote = null;
            this.saveNotes();
            this.renderNotesList();
            this.renderEditor();
        }
    }

    private toggleSearch(): void {
        const query = prompt('Search notes:');
        if (query) {
            this.searchNotes(query);
        }
    }

    private searchNotes(query: string): void {
        const filtered = this.notes.filter(note => 
            note.title.toLowerCase().includes(query.toLowerCase()) ||
            note.content.toLowerCase().includes(query.toLowerCase())
        );

        // Temporarily show filtered results
        const notesList = document.getElementById('notesList')!;
        notesList.innerHTML = filtered.map(note => `
            <div class="note-item" data-id="${note.id}">
                <div class="note-title">${this.escapeHtml(note.title)}</div>
                <div class="note-preview">${this.escapeHtml(note.content.substring(0, 100))}</div>
                <div class="note-date">${this.formatDate(note.updatedAt)}</div>
            </div>
        `).join('');

        // Add click listeners
        notesList.querySelectorAll('.note-item').forEach(item => {
            item.addEventListener('click', () => {
                const id = (item as HTMLElement).dataset.id!;
                const note = this.notes.find(n => n.id === id);
                if (note) {
                    this.selectNote(note);
                    this.renderNotesList(); // Restore full list
                }
            });
        });
    }

    private formatDate(date: Date): string {
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        if (days === 0) return 'Today';
        if (days === 1) return 'Yesterday';
        if (days < 7) return `${days} days ago`;
        
        return date.toLocaleDateString();
    }

    private escapeHtml(text: string): string {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the app
new NotesApp();
