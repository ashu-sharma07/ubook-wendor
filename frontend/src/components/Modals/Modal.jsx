import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

export default function ModalComponent({ isOpen = false, setIsOpen = () => { }, loading = false, action = () => { }, children, title = "" }) {
    const onClose = () => {
        setIsOpen(false)
    }
    return (
        <Modal size="xl" isDismissable onClose={onClose} isOpen={isOpen}>
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
                <ModalBody>
                    {children}
                </ModalBody>
                <ModalFooter>
                    <Button isLoading={loading} disabled={loading} className="bg-green-900 text-white" onPress={action}>
                        Done
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}