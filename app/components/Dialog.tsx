import { useNavigation } from 'react-router';
import { MdClose } from 'react-icons/md';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function Dialog({
    trigger,
    triggerClassName,
    children,
    title,
    submit,
    close,
    handleSubmit,
}: {
    children: React.ReactNode;
    trigger: React.ReactNode;
    triggerClassName?: string,
    submit?: React.ReactNode;
    close?: React.ReactNode;
    handleSubmit?: () => void;
    title?: string;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    useEffect(() => {
        if (isOpen && navigation.state === 'submitting') {
            handleClose();
        }
    }, [navigation.state, isOpen]);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => {
        console.log("Close DIalog");
        setIsExiting(true);
        setTimeout(() => {
            // Actually remove the component after animation completes
            setIsOpen(false);
            setIsExiting(false);
        }, 150);
    };

    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                handleClose();
            }
            // Prevent space from closing dialog when focused inside
            if (e.key === ' ' && e.target !== document.body) {
                e.stopPropagation();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen])

    return (
        <>
            <button onClick={handleOpen} className={`cursor-pointer ${triggerClassName}`}>
                {trigger}
            </button>

            {mounted &&
                isOpen &&
                createPortal(
                    <div
                        role='dialog'
                        aria-modal='true'
                        onClick={handleClose}
                        className={`${isExiting ? 'motion-opacity-out-0' : 'motion-preset-focus-md'} motion-duration-150 bg-black/20 fixed inset-0 w-full h-full z-40 
                    flex justify-center items-center cursor-default`}
                    >
                        <div
                            role="button"
                            tabIndex={0}
                            onKeyDown={event => {
                                if (event.key === 'Space') {
                                    console.log('HI');
                                }
                            }}
                            onClick={(e: React.MouseEvent) =>
                                e.stopPropagation()
                            }
                            className={`${isExiting ? 'motion-scale-out-75 motion-opacity-out-0' : 'motion-scale-in-75 motion-opacity-in-0'}
                        relative flex flex-col items-start justify-start motion-duration-150 gap-4
                        bg-orange-50 border-2 border-primary p-4 transition-all
                        shadow-sharp-br hover:shadow-sharp-b max-w-xl w-full m-4 overflow-y-auto cursor-default`}
                        >
                            <div className="flex w-full justify-between items-center border-b border-b-primary/20">
                                <h1 className="text-xl font-bold font-title leading-loose">
                                    {title || 'Title'}
                                </h1>
                                <button
                                    onClick={handleClose}
                                    className="absolute top-4 right-4 cursor-pointer"
                                >
                                    <MdClose
                                        size={20}
                                        className="hover:text-accent transition-colors"
                                    />
                                </button>
                            </div>
                            {children}
                            <div className="flex justify-between items-center w-full">
                                <div />
                                <div className='flex items-center justify-center gap-2'>
                                    {close && (
                                        <button onClick={handleClose}>
                                            {close}
                                        </button>
                                    )}
                                    {submit && (
                                        <button
                                            onClick={() => {
                                                handleClose();
                                                if (handleSubmit) handleSubmit();
                                            }}
                                        >
                                            {submit}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>,
                    document.body
                )}
        </>
    );
}

