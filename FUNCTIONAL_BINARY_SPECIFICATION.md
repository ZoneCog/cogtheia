# Cogtheia Functional Binary Specification

## Problem Statement

Current binaries are **form over function** - they look like working IDEs but lack core functionality. This specification defines what constitutes a **truly functional** binary vs. simulation.

## Functional Requirements (Non-Negotiable)

### 1. **File System Integration** (Core 20%)

- ✅ **MUST**: Open, read, write, and save actual files from disk
- ✅ **MUST**: Navigate directory trees with real file system access  
- ✅ **MUST**: File watchers for real-time change detection
- ❌ **NOT**: Mock file objects or in-memory simulations

**Test**: Can edit a real `.js` file and save changes to disk

### 2. **Monaco Editor Integration** (Core 20%)

- ✅ **MUST**: Actual Monaco editor instance with syntax highlighting
- ✅ **MUST**: Language services (TypeScript, JavaScript, etc.)
- ✅ **MUST**: Code completion, error detection, refactoring
- ❌ **NOT**: Textarea with syntax coloring

**Test**: TypeScript error detection and auto-completion work

### 3. **Workspace Management** (Core 20%)

- ✅ **MUST**: Open folders as workspaces
- ✅ **MUST**: Multi-file project navigation
- ✅ **MUST**: Workspace configuration and preferences
- ❌ **NOT**: Single-file or mock workspace

**Test**: Open a Node.js project folder with multiple files

### 4. **Extension System** (Core 20%)

- ✅ **MUST**: Load and execute VS Code extensions
- ✅ **MUST**: Extension API compatibility layer
- ✅ **MUST**: Extension lifecycle management
- ❌ **NOT**: Placeholder extension lists

**Test**: Install and use a real VS Code extension

### 5. **AI Integration** (Core 20%)

- ✅ **MUST**: Real OpenCog AtomSpace integration
- ✅ **MUST**: Actual code analysis (not mock responses)
- ✅ **MUST**: Learning from user interactions
- ❌ **NOT**: Hardcoded JSON responses

**Test**: AI provides different responses based on actual code content

## Current Binary Assessment

### ❌ **Failing Specifications**

| Component | Current State | Functional? | Issue |
|-----------|---------------|-------------|-------|
| File System | Mock API responses | **NO** | No real file I/O |
| Monaco Editor | HTML textarea | **NO** | Not actual Monaco |
| Workspace | Static HTML | **NO** | No workspace concept |
| Extensions | None | **NO** | No extension system |
| AI Integration | Hardcoded JSON | **NO** | No real AI processing |

### 📊 **Actual Functionality Score: ~5%**

- **Form**: 95% (looks professional)
- **Function**: 5% (minimal actual IDE capabilities)

## Proposed Solution: Minimal Viable IDE (MVI)

### Phase 1: Core File Operations

```javascript
// Real file system integration
const fs = require('fs').promises;
const path = require('path');

class FileSystemService {
    async openFile(filePath) {
        const content = await fs.readFile(filePath, 'utf8');
        const stats = await fs.stat(filePath);
        return { content, modified: stats.mtime };
    }
    
    async saveFile(filePath, content) {
        await fs.writeFile(filePath, content, 'utf8');
        return { saved: true, timestamp: new Date() };
    }
}
```

### Phase 2: Monaco Integration

```html
<!-- Real Monaco editor -->
<div id="editor-container"></div>
<script src="https://unpkg.com/monaco-editor@latest/min/vs/loader.js"></script>
<script>
require.config({ paths: { vs: 'https://unpkg.com/monaco-editor@latest/min/vs' }});
require(['vs/editor/editor.main'], function() {
    const editor = monaco.editor.create(document.getElementById('editor-container'), {
        value: fileContent, // Real file content
        language: 'typescript'
    });
});
</script>
```

### Phase 3: Workspace Service

```javascript
class WorkspaceService {
    constructor(rootPath) {
        this.rootPath = rootPath;
        this.fileTree = null;
    }
    
    async loadWorkspace() {
        this.fileTree = await this.buildFileTree(this.rootPath);
        return this.fileTree;
    }
    
    async buildFileTree(dirPath) {
        const items = await fs.readdir(dirPath, { withFileTypes: true });
        // Build actual file tree from disk
    }
}
```

## Definition of "Working"

### ✅ **Working Binary Criteria**

1. **Can open a real project folder**
2. **Can edit and save actual files**  
3. **Provides real syntax highlighting and error detection**
4. **Can install and use at least one VS Code extension**
5. **AI features analyze actual code, not mocks**

### ❌ **Non-Working (Simulation) Criteria**

1. **Only serves static HTML**
2. **Returns hardcoded API responses**
3. **Cannot persist changes to disk**
4. **No real editor functionality**
5. **No actual AI processing**

## Implementation Priority

### High Priority (Minimum Viable)

1. **File System Service** - Real file I/O
2. **Monaco Editor** - Actual editor instance
3. **Basic Workspace** - Open folder functionality

### Medium Priority (IDE Essentials)  

4. **Extension Loading** - VS Code extension support
5. **AI Integration** - Real OpenCog processing

### Low Priority (Polish)

6. **UI Improvements** - Better styling and UX
7. **Advanced Features** - Debugging, terminals, etc.

## Success Metrics

### Functional Tests

- [ ] Open `/path/to/project` folder
- [ ] Edit `src/index.js` and save changes
- [ ] See TypeScript errors in real-time
- [ ] Install ESLint extension and see linting
- [ ] AI analyzes actual code structure

### Performance Benchmarks

- File open time: <500ms
- Editor responsiveness: <100ms keystroke delay
- Memory usage: <200MB for basic workspace
- Startup time: <10s to functional state

---

**The Goal**: Create binaries that are **actually functional IDEs**, not convincing simulations of IDEs.
