import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

const AuthModal: React.FC = () => {
  const { isModalOpen, closeAuthModal } = useAuth();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  const modalVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.9
    },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: { 
        type: 'spring',
        damping: 25,
        stiffness: 500
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: { 
        duration: 0.2
      }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <>
          {/* Overlay */}
          <motion.div 
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={closeAuthModal}
          />

          {/* Modal */}
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div 
              className="bg-white rounded-lg max-w-md w-full mx-4 overflow-hidden relative"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Tabs */}
              <div className="flex border-b">
                <button 
                  className={`flex-1 py-4 text-center font-accent font-semibold ${
                    activeTab === 'login' 
                      ? 'text-primary border-b-2 border-primary' 
                      : 'text-neutral-dark/70'
                  }`}
                  onClick={() => setActiveTab('login')}
                >
                  LOGIN
                </button>
                <button 
                  className={`flex-1 py-4 text-center font-accent font-semibold ${
                    activeTab === 'register' 
                      ? 'text-primary border-b-2 border-primary' 
                      : 'text-neutral-dark/70'
                  }`}
                  onClick={() => setActiveTab('register')}
                >
                  REGISTER
                </button>
              </div>
              
              {/* Form Content */}
              <div className="p-6">
                {activeTab === 'login' ? (
                  <LoginForm />
                ) : (
                  <RegisterForm />
                )}
              </div>
              
              {/* Close Button */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-4 right-4 text-neutral-dark hover:text-primary"
                onClick={closeAuthModal}
                aria-label="Close"
              >
                <X size={20} />
              </Button>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
