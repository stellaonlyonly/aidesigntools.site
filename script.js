document.addEventListener('DOMContentLoaded', function() {
    // 侧边栏折叠功能
    const toggleBtn = document.getElementById('toggleSidebar');
    const sidebar = document.querySelector('.sidebar');
    
    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
            
            // 更改图标方向
            const icon = this.querySelector('i');
            if (sidebar.classList.contains('collapsed')) {
                icon.classList.remove('fa-chevron-left');
                icon.classList.add('fa-chevron-right');
            } else {
                icon.classList.remove('fa-chevron-right');
                icon.classList.add('fa-chevron-left');
            }
        });
    }
    
    // 搜索功能
    const searchInput = document.getElementById('searchInput');
    const toolCards = document.querySelectorAll('.tool-card');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            
            toolCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();
                const tags = Array.from(card.querySelectorAll('.tool-tags span'))
                    .map(tag => tag.textContent.toLowerCase());
                
                const isVisible = 
                    title.includes(searchTerm) || 
                    description.includes(searchTerm) || 
                    tags.some(tag => tag.includes(searchTerm));
                
                card.style.display = isVisible ? 'block' : 'none';
            });
        });
    }
    
    // 分类导航功能
    const categoryLinks = document.querySelectorAll('.sidebar-nav a');
    
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // 移除所有活动状态
            categoryLinks.forEach(l => l.classList.remove('active'));
            
            // 添加当前活动状态
            this.classList.add('active');
            
            // 如果是"全部工具"，显示所有分类
            if (this.getAttribute('href') === '#all') {
                document.querySelectorAll('.category').forEach(cat => {
                    cat.style.display = 'block';
                });
            } else {
                // 否则只显示选中的分类
                const targetId = this.getAttribute('href').substring(1);
                
                document.querySelectorAll('.category').forEach(cat => {
                    if (cat.id === targetId) {
                        cat.style.display = 'block';
                        
                        // 显示该分类下的所有卡片
                        cat.querySelectorAll('.tool-card').forEach(card => {
                            card.style.display = 'block';
                        });
                    } else {
                        cat.style.display = 'none';
                    }
                });
            }
            
            // 平滑滚动到目标位置
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 20,
                    behavior: 'smooth'
                });
            }
            
            // 在移动设备上自动折叠侧边栏
            if (window.innerWidth <= 992 && sidebar) {
                sidebar.classList.add('collapsed');
                if (mainContent) mainContent.classList.add('expanded');
                
                if (toggleBtn) {
                    const icon = toggleBtn.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-chevron-left');
                        icon.classList.add('fa-chevron-right');
                    }
                }
            }
        });
    });
    
    // 添加工具卡片悬停效果
    toolCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    // 响应式设计 - 自动处理侧边栏
    function handleResponsive() {
        if (window.innerWidth <= 992) {
            if (sidebar && !sidebar.classList.contains('collapsed')) {
                sidebar.classList.add('collapsed');
                if (mainContent) mainContent.classList.add('expanded');
                
                if (toggleBtn) {
                    const icon = toggleBtn.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-chevron-left');
                        icon.classList.add('fa-chevron-right');
                    }
                }
            }
        }
    }
    
    // 初始化时执行一次
    handleResponsive();
    
    // 窗口大小改变时执行
    window.addEventListener('resize', handleResponsive);
    
    // 添加滚动到顶部按钮
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.className = 'scroll-top-btn';
    document.body.appendChild(scrollTopBtn);
    
    // 滚动事件处理
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });
    
    // 点击滚动到顶部
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});