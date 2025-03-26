

export const generateFileName = ({ name, format }: { name: string, format: "png" | "pdf" }) => {
	return `${name}-${self.crypto.randomUUID()}.${format}`
}
